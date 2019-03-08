import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

const styles = {
  avatar: {
    width: 50,
    height: 50,
  },
  root: {
    display: 'flex',
    padding: 5
  },
  sender: {
    marginLeft: 48
  },
  timestamp: {
    marginLeft: 62,
    color: '#dedede'
  }
}

export const Message = ({ message, classes, currentUser }) => {
  console.log(message.createdAt)
  console.log(message.createdAt.substr(11).slice(0, -4));
  return (
    <div className={classes.root}>
      { currentUser === message.senderId ? (
      <div>
        <Typography variant="body1" className={classes.sender}>{message.senderId}</Typography>
        <Chip color="secondary" avatar={
          <Avatar src={
            Object.values(message.userStore.users).filter((user) => {
              return user.id === message.senderId
            })[0].avatarURL
          } alt="avatar" className={classes.avatar}/>
        }
        label={message.text}
        className={classes.chip}
        />
        <Typography variant="body2" className={classes.timestamp}>{message.createdAt.substr(11).slice(0, -4)}</Typography>
      </div>
      ) : (
        <div>
        <Typography variant="body1" align="left" className={classes.sender}>{message.senderId}</Typography>
        <Chip color="primary" avatar={
          <Avatar src={
            Object.values(message.userStore.users).filter((user) => {
              return user.id === message.senderId
            })[0].avatarURL
          } alt="avatar" className={classes.avatar}/>
        }
        label={message.text}
        className={classes.chip}
        />
      </div>
      )}
    </div>
  )
}

export const mapStateToProps = (state) => ({
  currentUser: state.currentUser
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Message);

Message.propTypes = {
  username: PropTypes.string,
  text: PropTypes.string
}