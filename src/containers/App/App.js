import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import ChatBox from '../ChatBox/ChatBox';
import { resetMessages, addMessage, sortRooms, updateCurrentRoom } from '../../actions';

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