import React from 'react';
import PropTypes from 'prop-types';

export const Message = (props) => {
  return (
    <div className="Message">
      <div className="message-username">{props.username}</div>
      <div className="message-text">{props.text}</div>
    </div>
  )
}

export default Message;

Message.propTypes = {
  username: PropTypes.string,
  text: PropTypes.string
}