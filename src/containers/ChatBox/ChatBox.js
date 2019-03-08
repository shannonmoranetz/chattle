import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { resetMessages, addMessage, sortRooms, updateCurrentRoom, setError, setAvatar } from '../../actions';
import Chatkit from '@pusher/chatkit-client';
import { tokenProvider } from '../../utils/tokenProvider';
import MessageList from '../../containers/MessageList/MessageList';
import RoomList from '../../containers/RoomList/RoomList';
import SendMessageForm from '../../components/SendMessageForm/SendMessageForm';
import UserForm from '../UserForm/UserForm';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Hidden, CssBaseline } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';




const drawerWidth = 200;

const styles = (theme) => ({
  root: {
    display: 'flex',

  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    top: 'auto',
    bottom: 0,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

export class ChatBox extends Component {

  componentDidMount() {
    this.initializeChat()
  }

  initializeChat = async () => {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:246b3612-b77d-450d-824f-85cf24e32654",
      userId: this.props.currentUser || 'guest',
      tokenProvider: tokenProvider
    });
    try {
      let currentUser = await chatManager.connect();
      this.currentUser = currentUser;
      this.props.setAvatar(currentUser.avatarURL);
      this.getRooms();
    } catch (error) {
      this.props.setError(`Error on connecting: ${error.info.error_description}`);
    }
  }

  getRooms = async () => {
    let { sortRooms, setError } = this.props;
    try {
      let joinableRooms = await this.currentUser.getJoinableRooms()
      const rooms = [...joinableRooms, ...this.currentUser.rooms]
      sortRooms(rooms);
    } catch (error) {
      setError(`Error on room fetch: ${error.info.error_description}`);
    }
  }

  subscribeToRoom = async (roomId) => {
    let { resetMessages, addMessage, updateCurrentRoom, setError } = this.props;
    try {
      resetMessages();
      let room = await this.currentUser.subscribeToRoom({
        roomId,
        messageLimit: 80,
        hooks: {
          onMessage: message => {
            addMessage(message)
          }
        }
      })
      updateCurrentRoom(room.id);
      this.getRooms();
    } catch (error) {
      setError(`Error on room subscription: ${error.info.error_description}`);
    }
  }

  sendMessage = (text) => {
    this.currentUser.sendMessage({
      text,
      roomId: this.props.currentRoomId
    })
  }

  createRoom = async (name) => {
    try {
      let room = await this.currentUser.createRoom({
        name
      })
      this.subscribeToRoom(room.id)
    } catch (error) {
      this.props.setError(`Error on room creation: ${error.info.error_description}`);
    }
  }

  render() {
    let { currentUser, currentRoomId, avatar, classes } = this.props;
    return (
      <div className={classes.root}>
        {!currentUser ? (
          <Dialog open={true} maxWidth="xl">
            <UserForm />
          </Dialog>
        ) : (
        <div >
          <Drawer className={classes.drawer} variant="permanent" anchor="left"
            classes={{
              paper: classes.drawerPaper,
            }}>
            <div className={classes.toolbar} />
              <Divider />
              <List className={classes.contentContainer}>
                <ListItem >
                  <Typography className={classes.navTitle} variant="body1" align="center">chattle <img src="https://i.imgur.com/XVCBZ72.png" className="heart-icon-sm" alt="heart"></img></Typography>
                </ListItem>
                <ListItem button >
                    <Button variant="contained" color="secondary" className={classes.drawerButton} onClick={() => window.location.reload()}>log out <Icon className={classes.rightIcon}>exit_to_app</Icon></Button>
                </ListItem>
                <ListItem >
                  <p className="user-greeting">hello, {currentUser}</p>
                </ListItem>
                <ListItem >
                  <RoomList subscribeToRoom={this.subscribeToRoom} createRoom={this.createRoom}/> {currentUser && <Avatar src={avatar} className={classes.avatar} alt='avatar' />}
                </ListItem>
              </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar}/>
              {currentUser && <MessageList subscribeToRoom={this.subscribeToRoom} createRoom={this.createRoom}/>}
          </main>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              {currentRoomId && <SendMessageForm sendMessage={this.sendMessage} />}
            </Toolbar>
          </AppBar>
        </div>
      )}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  currentRoomId: state.currentRoomId,
  currentUser: state.currentUser,
  rooms: state.rooms,
  avatar: state.avatar
})

export const mapDispatchToProps = (dispatch) => ({
  resetMessages: (messages) => dispatch(resetMessages(messages)),
  addMessage: (message) => dispatch(addMessage(message)),
  sortRooms: (rooms) => dispatch(sortRooms(rooms)),
  updateCurrentRoom: (roomId) => dispatch(updateCurrentRoom(roomId)),
  setError: (error) => dispatch(setError(error)),
  setAvatar: (avatar) => dispatch(setAvatar(avatar))
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(ChatBox);

ChatBox.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  addMessage: PropTypes.func,
  setAvatar: PropTypes.func,
  setError: PropTypes.func,
  sortRooms: PropTypes.func,
  updateCurrentRoom: PropTypes.func,
  resetMessages: PropTypes.func,
  rooms: PropTypes.array,
  currentRoomId: PropTypes.string,
  avatar: PropTypes.string,
  currentUser: PropTypes.string
}