import React from 'react';
import PropTypes from 'prop-types';

export const Message = ({ message }) => {
  return (
    <div className="Message">
      <div className="message-username">{message.senderId}</div>
      <div className="message-text">{message.text}</div>
      <img src={
        Object.values(message.userStore.users).filter((user) => {
          return user.id === message.senderId
        })[0].avatarURL
      } alt="avatar" />
    </div>
  )
}

export default Message;

Message.propTypes = {
  username: PropTypes.string,
  text: PropTypes.string
}