import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Message from '../../components/Message/Message';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import RoomList from '../../containers/RoomList/RoomList';
import DialogContent from '@material-ui/core/DialogContent';

const styles={}

export class MessageList extends Component {
  
  Transition = (props) => {
    return <Slide direction="down" {...props} />;
  }

  cleanTimestamp = (message) => {
    if (this.props.messages.length > 0) {
    let shortenedTime = message.createdAt.substr(11).slice(0, -4);
    let minutes = message.createdAt.substr(11).slice(3, 5);
    let hour = parseInt(shortenedTime.slice(0, 2)) + 5;
    let timeValue;
    if (hour > 0 && hour <= 12) {
      timeValue= "" + hour;
    } else if (hour > 12) {
      timeValue= "" + (hour - 12);
    } else if (hour == 0) {
      timeValue= "12";
    }
    let meridian ;
    if (hour >= 12) {
      meridian = 'AM'
    } else {
      meridian = 'PM'
    }
    let updatedTime = `${timeValue}:${minutes} ${meridian}`
    return updatedTime
    } else {
      return null
    }
  }

  render() {
    let { currentRoomId, messages, classes, subscribeToRoom, createRoom } = this.props;
    return (
      <div className={classes.root}>
        {!currentRoomId ? (
          <Dialog keepMounted open={true} TransitionComponent={this.Transition} transitionDuration={1000}>
              <DialogContent>
                <RoomList subscribeToRoom={subscribeToRoom} createRoom={createRoom} />
              </DialogContent>
          </Dialog>
        ) : (
            <div className="messages">
              {messages.map((message, i) => {
                return (
                  <Message key={i} message={message} timestamp={this.cleanTimestamp(message)}/>
                )
              }).reverse()}
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