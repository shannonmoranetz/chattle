import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetMessages, addMessage, sortRooms, updateCurrentRoom, setError } from '../../actions';
import Chatkit from '@pusher/chatkit-client';
import { tokenProvider } from '../../utils/tokenProvider';
import MessageList from '../../containers/MessageList/MessageList';
import RoomList from '../../containers/RoomList/RoomList';
import SendMessageForm from '../../components/SendMessageForm/SendMessageForm';
import UserForm from '../UserForm/UserForm';

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
      this.getRooms();
    } catch (error) {
      console.log(error)
      this.props.setError(`Error on connecting: ${error.info.error_description}`);
    }
  }

  getRooms = async () => {
    try {
      let joinableRooms = await this.currentUser.getJoinableRooms()
      const rooms = [...joinableRooms, ...this.currentUser.rooms]
      this.props.sortRooms(rooms);
    } catch (error) {
      this.props.setError(`Error on room fetch: ${error.info.error_description}`);
    }
  }

  subscribeToRoom = async (roomId) => {
    try {
      this.props.resetMessages();
      let room = await this.currentUser.subscribeToRoom({
        roomId,
        hooks: {
          onMessage: message => {
            this.props.addMessage(message)
          }
        }
      })
      this.props.updateCurrentRoom(room.id)
      this.getRooms();
    } catch (error) {
      this.props.setError(`Error on room subscription: ${error.info.error_description}`);
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
    return (
      <div className="ChatBox">
        {!this.props.currentUser ? (
          <UserForm loginUser={this.loginUser} />
        ) : (
            <div className="chat-components">
              <RoomList subscribeToRoom={this.subscribeToRoom}
                createRoom={this.createRoom} />
              <MessageList />
            </div>
          )}
        {this.props.currentRoomId && <SendMessageForm sendMessage={this.sendMessage} />}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  currentRoomId: state.currentRoomId,
  currentUser: state.currentUser,
  rooms: state.rooms
})

export const mapDispatchToProps = (dispatch) => ({
  resetMessages: (messages) => dispatch(resetMessages(messages)),
  addMessage: (message) => dispatch(addMessage(message)),
  sortRooms: (rooms) => dispatch(sortRooms(rooms)),
  updateCurrentRoom: (roomId) => dispatch(updateCurrentRoom(roomId)),
  setError: (error) => dispatch(setError(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);