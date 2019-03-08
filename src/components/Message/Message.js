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
    width: 60,
    height: 60,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 4,
  },
  sender: {
    marginLeft: 48,
    fontSize: 13,
    letterSpacing: 0.4,
  },
  timestamp: {
    marginLeft: 62,
    color: '#dedede'
  },
  chip: {
    fontSize: 16,
  }
}

export const Message = ({ message, classes, currentUser, timestamp }) => {
  return (
    <div className={classes.root}>
      { currentUser === message.senderId ? (
      <div>
        <Typography variant="overline" className={classes.sender}>{message.senderId}</Typography>
        <Chip color="secondary" avatar={
          <Avatar src={
            Object.values(message.userStore.users).filter((user) => {
              return user.id === message.senderId
            })[0].avatarURL
          } alt="avatar" className={classes.avatar}/>
        }
        label={message.text}
        className={classes.chip}
        >
        </Chip>
        <Typography variant="body2" className={classes.timestamp}>{timestamp}</Typography>
      </div>
      ) : (
        <div>
        <Typography variant="overline" align="left" className={classes.sender}>{message.senderId}</Typography>
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
        <Typography variant="body2" className={classes.timestamp}>{timestamp}</Typography>
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