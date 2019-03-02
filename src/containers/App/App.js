import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import MessageList from '../../components/MessageList/MessageList';

export class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <MessageList />
      </div>
    );
  }
}

export default App;