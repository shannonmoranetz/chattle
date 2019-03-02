import React from 'react';

class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
              { DUMMY_DATA.map((message, i) => {
                return ( 
                  <div key={i} className="message">
                    <div>{message.text}</div>
                    <div>{message.senderId}</div>
                  </div>
                )
              })}
            </div>
        )
    }
}

export default MessageList