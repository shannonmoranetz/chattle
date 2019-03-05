import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Message from '../../components/Message/Message';
import PropTypes from 'prop-types';

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
    let { currentUser, currentRoomId, messages } = this.props;
    return (
      <div className="MessageList">
        <p className="user-greeting">hello, {currentUser}</p>
        {!currentRoomId ? (
          <div className="join-room">join a room to see messages...</div>
        ) : (
            <div className="messages">
              {messages.map((message, i) => {
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
  currentRoomId: state.currentRoomId,
  currentUser: state.currentUser
})

export default connect(mapStateToProps)(MessageList);

MessageList.propTypes = {
  currentRoomId: PropTypes.string,
  currentUser: PropTypes.string,
  messages: PropTypes.array
}