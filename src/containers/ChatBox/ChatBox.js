import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit-client';
import { tokenProvider } from '../../utils/tokenProvider';
import { connect } from 'react-redux';
import MessageList from '../../components/MessageList/MessageList';
import RoomList from '../../components/RoomList/RoomList';
import SendMessageForm from '../SendMessageForm/SendMessageForm';
import { resetMessages, addMessage, sortRooms, updateCurrentRoom } from '../../actions';
import UserForm from '../UserForm/UserForm';

export class ChatBox extends Component {

  componentDidMount = () => {
    this.loginUser();
  }

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
      console.log('Error on connecting:', error);
    }
  }

  getRooms = async () => {
    try {
      let joinableRooms = await this.currentUser.getJoinableRooms()
      const rooms = [...joinableRooms, ...this.currentUser.rooms]
      this.props.sortRooms(rooms);
    } catch (error) {
      console.log('Error on getting rooms: ', error);
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
      console.log('Error on subscribing to room: ', error)
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
      console.log('Error on creating room: ', error)
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
              <SendMessageForm  sendMessage={this.sendMessage}
                                disabled={!this.props.currentRoomId} />
            </div>
          )}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  messages: state.messages,
  rooms: state.rooms,
  currentRoomId: state.currentRoomId,
  currentUser: state.currentUser
})

export const mapDispatchToProps = (dispatch) => ({
  resetMessages: (messages) => dispatch(resetMessages(messages)),
  addMessage: (message) => dispatch(addMessage(message)),
  sortRooms: (rooms) => dispatch(sortRooms(rooms)),
  updateCurrentRoom: (roomId) => dispatch(updateCurrentRoom(roomId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);