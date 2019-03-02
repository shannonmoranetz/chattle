import React, { Component } from 'react';
import { chatManager } from '../../index';
import Header from '../../components/Header/Header';
import MessageList from '../../components/MessageList/MessageList';
import SendMessageForm from '../SendMessageForm/SendMessageForm';
import RoomList from '../../components/RoomList/RoomList';
import NewRoomForm from '../NewRoomForm/NewRoomForm';

export class App extends Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      roomId: null
    }
  }

  componentDidMount = () => {
    this.connectChatkit();
  }

  connectChatkit = () => {
    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser
        this.getRooms();
      })
      .catch(error => {
        console.error('error on connecting:', error);
      });
  }

  getRooms = () => {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({ 
          joinableRooms, 
          joinedRooms: this.currentUser.rooms 
        })
      })
      .catch(error => console.log('error on joinableRooms: ', error))
  }

  subscribeToRoom = (roomId) => {
    this.setState({ messages: [] })
    this.currentUser.subscribeToRoom({
      roomId,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
    })
      .then(room => {
        this.setState({
          roomId: room.id
        })
        this.getRooms();
      })
        .catch(error => console.log('error on subscribing to room: ', error))
  }

  sendMessage = (text) => {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  }

  createRoom = (name) => {
    this.currentUser.createRoom({
      name
    })
  .then(room => this.subscribeToRoom(room.id))
  .catch(error => console.log('error with createRoom: ', error))
  }

  render() {
    return (
      <div className="App">
        <Header />
        <RoomList   rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                    subscribeToRoom={this.subscribeToRoom} 
                    roomId={this.state.roomId}
        />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    );
  }
}

export default App;