import React, { Component } from 'react';
import { chatManager } from '../../index';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import MessageList from '../../components/MessageList/MessageList';
import NewRoomForm from '../NewRoomForm/NewRoomForm';
import RoomList from '../../components/RoomList/RoomList';
import SendMessageForm from '../SendMessageForm/SendMessageForm';
import { resetMessages, addMessage, sortRooms, updateCurrentRoom } from '../../actions';

export class App extends Component {

  componentDidMount = () => {
    this.connectChatkit();
  }

  connectChatkit = async () => {
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
      <div className="App">
        <Header />
        <RoomList subscribeToRoom={this.subscribeToRoom} />
        <MessageList />
        <SendMessageForm  sendMessage={this.sendMessage}
                          disabled={!this.props.currentRoomId} />
        <NewRoomForm  createRoom={this.createRoom} />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  messages: state.messages,
  rooms: state.rooms,
  currentRoomId: state.currentRoomId
})

export const mapDispatchToProps = (dispatch) => ({
  resetMessages: (messages) => dispatch(resetMessages(messages)),
  addMessage: (message) => dispatch(addMessage(message)),
  sortRooms: (rooms) => dispatch(sortRooms(rooms)),
  updateCurrentRoom: (roomId) => dispatch(updateCurrentRoom(roomId))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);