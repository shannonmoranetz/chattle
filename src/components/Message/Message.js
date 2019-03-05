import React from 'react';
import PropTypes from 'prop-types';

export const Message = ({ username, text }) => {
  return (
    <div className="Message">
      <div className="message-username">{username}</div>
      <div className="message-text">{text}</div>
    </div>
  )
}

export default Message;

Message.propTypes = {
  username: PropTypes.string,
  text: PropTypes.string
}