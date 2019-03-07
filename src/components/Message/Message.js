import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: 'flex'
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  }
}

export const Message = ({ message, classes }) => {
  //cnhg img 2 avtr
  return (
    <div className={classes.root}>

      <div>
        <img src={
          Object.values(message.userStore.users).filter((user) => {
            return user.id === message.senderId
          })[0].avatarURL
        } alt="avatar" />
      </div>

      <div className={classes.column}>
        <div className="message-username">{message.senderId}</div>
        <div className="message-text">{message.text}</div>
      </div>

    </div>
  )
}

export default withStyles(styles)(Message);

Message.propTypes = {
  username: PropTypes.string,
  text: PropTypes.string
}