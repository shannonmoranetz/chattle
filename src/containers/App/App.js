import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import ChatBox from '../ChatBox/ChatBox';

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