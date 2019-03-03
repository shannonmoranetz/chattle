import React from 'react';
import ReactDOM from 'react-dom';
import Message from '../Message/Message';

export class MessageList extends React.Component {

  getSnapshotBeforeUpdate = () => {
    const node = ReactDOM.findDOMNode(this)
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
  }

  componentDidUpdate = () => {
    const node = ReactDOM.findDOMNode(this)
    node.scrollTop = node.scrollHeight
  }

  render() {
    if (!this.props.roomId) {
      return (
        <div className="message-list">
          <div className="join-room">
            &larr; Join a room!
          </div>
        </div>
      )
    } else {
      return (
        <div className="MessageList">
          {this.props.messages.map((message, i) => {
            return (
              <Message key={i} username={message.senderId} text={message.text} />
            )
          })}
        </div>
      )
    }
  }
}

export default MessageList;