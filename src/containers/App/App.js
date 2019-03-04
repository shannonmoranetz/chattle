import React, { Component } from 'react';
import ChatBox from '../ChatBox/ChatBox';
import Header from '../../components/Header/Header';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ChatBox />
      </div>
    )
  }
}

export default App;