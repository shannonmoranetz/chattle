import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Message from '../../components/Message/Message';
import PropTypes from 'prop-types';

const styles = {
  // root: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   position: 'relative',
  //   marginTop: 20,
  //   marginRight: 40,
  //   marginBottom: 80,
  //   marginLeft: 40,
    // width: '50%'
  // }
}

export class MessageList extends Component {

  render() {
    let { currentRoomId, messages, classes } = this.props;
    return (
      <div className={classes.root}>
        {!currentRoomId ? (
          <div className="join-room">join a room to see messages...</div>
        ) : (
            <div className="messages">
              {messages.map((message, i) => {
                return (
                  <Message key={i} message={message} />
                )
              })}
            </div>
          )}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  messages: state.messages,
  currentRoomId: state.currentRoomId
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(MessageList);

MessageList.propTypes = {
  currentRoomId: PropTypes.string,
  currentUser: PropTypes.string,
  messages: PropTypes.array
}