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

const styles = {
  avatar: {
    margin: 10,
    width: 120,
    height: 120
  }
};

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
    let { currentUser, currentRoomId, avatar, classes } = this.props;
    return (
      <div className="ChatBox">
        {!currentUser ? (
          <Route path='/login' render={() => <UserForm loginUser={this.loginUser} />} />
        ) : (
            <div className="chat-components">
              <div onClick={() => window.location.reload()}>logout</div>
              <RoomList subscribeToRoom={this.subscribeToRoom}
                createRoom={this.createRoom} />
              <MessageList />
            </div>
          )}
        {currentRoomId && <SendMessageForm sendMessage={this.sendMessage} />}
        {currentUser && <Avatar src={avatar} className={classes.avatar} alt='avatar' />}
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