import React from 'react';
import Message from '../Message/Message';

class MessageList extends React.Component {


  render() {
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

export default MessageList