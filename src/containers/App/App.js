import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit-client';
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
      joinedRooms: []
    }
  }

  componentDidMount = () => {
    this.connectChatkit();
  }

  connectChatkit = () => {
    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser;
          this.getRooms();
      })
      .catch(error => {
        console.error('error on connecting:', error);
      });
  }

  getRooms = () => {
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
      this.setState({ joinableRooms, joinedRooms: this.currentUser.rooms })
    })
    .catch(error => console.log('error on joinableRooms: ', error))
  }

  subscribeToRoom = (roomId) => {
    this.currentUser.subscribeToRoom({
      roomId,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
    });
  }

  sendMessage = (text) => {
    this.currentUser.sendMessage({
      text,
      roomId: this.currentUser.rooms[0].id
    });

  }

  render() {
    return (
      <div className="App">
        <Header />
        <SendMessageForm sendMessage={this.sendMessage} />
        <MessageList messages={this.state.messages} />
        <RoomList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                  subscribeToRoom={this.subscribeToRoom} />
      </div>
    );
  }
}

export default App;