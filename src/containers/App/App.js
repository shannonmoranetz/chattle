import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit-client';
import { chatManager } from '../../index';
import Header from '../../components/Header/Header';
import MessageList from '../../components/MessageList/MessageList';
import SendMessageForm from '../SendMessageForm/SendMessageForm';

export class App extends Component {

  constructor() {
    super();
    this.state = {
      messages: []
    }
  }

  componentDidMount = () => {
    this.connectChatkit();
  }

  connectChatkit = () => {
    chatManager.connect()
      .then(currentUser => {
        currentUser.subscribeToRoom({
          roomId: currentUser.rooms[0].id,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          }
        });
      })
      .catch(error => {
        console.error("error:", error);
      });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <SendMessageForm />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}

export default App;