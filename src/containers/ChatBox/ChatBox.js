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

const drawerWidth = 200;

const styles = theme => ({
  avatar: {
    margin: 10,
    width: 120,
    height: 120,
    position: 'fixed',
    bottom: 0,
  },
  rightIcon: {
    marginLeft: 10
  },
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    marginBottom: 4,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: 'relative'
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  navTitle: {
    fontFamily: 'Sacramento',
    marginTop: 4,
    fontSize: 40
  },
  drawerButton: {
    marginBottom: 4,
  }
});

export class ChatBox extends Component {

  loginUser = () => {
    this.initializeChat();
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
    let { currentUser, currentRoomId, avatar, rooms, classes } = this.props;
    return (
      <div className={classes.root}>
        {!currentUser ? (
          <Route path='/login' render={() => <UserForm loginUser={this.loginUser} />} />
        ) : (
            <div>
              <AppBar position="relative" color="primary" className={classes.appBar}>
                <Toolbar >
                  <Grid container direction="column" alignItems="center" justify="center">
                    <Grid item>

                      <Typography className={classes.navTitle} variant="body1" align="center">chattle
                      <img src="https://i.imgur.com/XVCBZ72.png" className="heart-icon-sm" alt="heart"></img></Typography>
                    </Grid>

                    <Grid item>
                      <Button variant="contained" color="secondary" className={classes.drawerButton} onClick={() => window.location.reload()}>
                        log out <Icon className={classes.rightIcon}>exit_to_app</Icon>
                      </Button>
                    </Grid>

                    <Grid item>
                    <p className="user-greeting">hello, {currentUser}</p>
                    </Grid>

                  </Grid>
        {currentUser && <Avatar src={avatar} className={classes.avatar} alt='avatar' />}

                </Toolbar>
              </AppBar>
          <div>
              <div className={classes.toolbar}>
                <Drawer
                  className={classes.drawer}
                  variant="permanent"
                  classes={{ paper: classes.drawerPaper }}>
                  <RoomList subscribeToRoom={this.subscribeToRoom}
                    createRoom={this.createRoom} />
                </Drawer>
              </div>

            </div>
            </div>

          )}
        {currentRoomId && <SendMessageForm sendMessage={this.sendMessage} />}
        {currentUser && <MessageList />}
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