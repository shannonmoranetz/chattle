import React, { Component } from 'react';
import { chatManager } from '../../index';
import Header from '../../components/Header/Header';
import MessageList from '../../components/MessageList/MessageList';
import SendMessageForm from '../SendMessageForm/SendMessageForm';
import RoomList from '../../components/RoomList/RoomList';

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

  render() {
    return (
      <div className="App">
        <Header />
        <SendMessageForm sendMessage={this.sendMessage} />
        <MessageList messages={this.state.messages} />
        <RoomList   rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                    subscribeToRoom={this.subscribeToRoom} 
                    roomId={this.state.roomId}
                    />
      </div>
    );
  }
}

export default App;