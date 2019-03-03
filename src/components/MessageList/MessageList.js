import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Message from '../Message/Message';

export class MessageList extends Component {

  getSnapshotBeforeUpdate = () => {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
    return null;
  }

  componentDidUpdate = () => {
    const node = ReactDOM.findDOMNode(this)
    node.scrollTop = node.scrollHeight
  }

  render() {
    return (
      <div className="MessageList">
        {!this.props.currentRoomId ? (
          <div className="join-room">join a room...</div>
        ) : (
            <div className="messages">
              {this.props.messages.map((message, i) => {
                return (
                  <Message key={i} username={message.senderId} text={message.text} />
                )
              })}
            </div>
          )}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  messages: state.messages,
  currentRoomId: state.currentRoomId
})

export default connect(mapStateToProps)(MessageList);