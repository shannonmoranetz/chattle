import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Message from '../../components/Message/Message';
import PropTypes from 'prop-types';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
}

export class MessageList extends Component {
  constructor() {
    super();
    this.state = {
      msgAvatar: ''
    }
  }

  getSnapshotBeforeUpdate = () => {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
    return null;
  }

  componentDidUpdate = () => {
    const node = ReactDOM.findDOMNode(this)
    node.scrollTop = node.scrollHeight
  }

  render() {
    // console.log(this.props)
    let { currentRoomId, messages, classes } = this.props;
    return (
      <div className={classes.root}>
        {!currentRoomId ? (
          <div className="join-room">join a room to see messages...</div>
        ) : (
            <div className="messages">
              {messages.map((message, i) => {
                return (
                  <Message key={i} username={message.senderId} text={message.text} msg={message} />
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
  currentRoomId: state.currentRoomId,
  currentUser: state.currentUser,
  rooms: state.rooms
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