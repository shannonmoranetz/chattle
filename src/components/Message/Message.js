import React from 'react';
import PropTypes from 'prop-types';

export const Message = ({ username, text, avatar, msg }) => {
  console.log(msg)
  return (
    <div className="Message">
      <div className="message-username">{username}</div>
      <div className="message-text">{text}</div>
      <img src={
              Object.values(msg.userStore.users).filter((user) => {
                return user.id === msg.senderId
              })[0].avatarURL

      } alt="avtrr"/>
    </div>
  )
}

export default Message;

Message.propTypes = {
  username: PropTypes.string,
  text: PropTypes.string
}