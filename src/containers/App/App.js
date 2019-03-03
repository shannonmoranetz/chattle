import React, { Component } from 'react';
import { chatManager } from '../../index';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import MessageList from '../../components/MessageList/MessageList';
import NewRoomForm from '../NewRoomForm/NewRoomForm';
import RoomList from '../../components/RoomList/RoomList';
import SendMessageForm from '../SendMessageForm/SendMessageForm';
import { resetMessages, addMessage, sortRooms } from '../../actions';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      roomId: null
    }
  }

  componentDidMount = () => {
    this.connectChatkit();
  }

  connectChatkit = async () => {
    try {
      let currentUser = await chatManager.connect();
      this.currentUser = currentUser;
      this.getRooms();
    } catch (error) {
      console.log('error on connecting:', error);
    }
  }

  getRooms = async () => {
    try {
      let joinableRooms = await this.currentUser.getJoinableRooms()
      const rooms = [...joinableRooms, ...this.currentUser.rooms]
      this.props.sortRooms(rooms);
    } catch (error) {
      console.log('error on joinableRooms: ', error);
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
      this.setState({
        roomId: room.id
      })
      this.getRooms();
    } catch (error) {
      console.log('error on subscribing to room: ', error)
    }
  }

  sendMessage = (text) => {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })
  }

  createRoom = async (name) => {
    try {
      let room = await this.currentUser.createRoom({
        name
      })
      this.subscribeToRoom(room.id)
    } catch (error) {
      console.log('error with createRoom: ', error)
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <RoomList rooms={this.props.rooms}
                  roomId={this.state.roomId}
                  subscribeToRoom={this.subscribeToRoom}
        />
        <MessageList  roomId={this.state.roomId}
                      messages={this.state.messages} />
        <SendMessageForm  sendMessage={this.sendMessage}
                          disabled={!this.state.roomId} />
        <NewRoomForm  createRoom={this.createRoom} />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  messages: state.messages,
  rooms: state.rooms
})

export const mapDispatchToProps = (dispatch) => ({
  resetMessages: (messages) => dispatch(resetMessages(messages)),
  addMessage: (message) => dispatch(addMessage(message)),
  sortRooms: (rooms) => dispatch(sortRooms(rooms))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);