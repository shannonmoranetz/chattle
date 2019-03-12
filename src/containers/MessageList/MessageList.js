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
import toDate from 'normalize-date';
import uuid from 'uuid/v4';

const styles = (theme) => ({
  root: {
    height: '90vh',
    width: '100vw',
    overflowY: 'scroll',
    direction: 'rtl',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  },
  item: {
    direction: 'ltr'
  },
  dummy: {
    float: 'left',
    clear: 'both'
  }
})

export class MessageList extends Component {

  componentDidMount = () => {
    this.autoScrollMessages();
  }

  componentDidUpdate = () => {
    this.autoScrollMessages();
  }

  autoScrollMessages = () => {
    this.endMessages.scrollIntoView({ behavior: "smooth" });
  }

  Transition = (props) => {
    return <Slide direction="down" {...props} />;
  }

  cleanTimestamp = (message) => {
    if (this.props.messages.length > 0) {
      let cleanedTime = toDate(message.createdAt);
      let hours = cleanedTime.getHours();
      let minutes = cleanedTime.getMinutes();
      let meridian = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      let timeString = hours + ':' + minutes + ' ' + meridian;
      return timeString;
    } else {
      return null;
    }
  }

  cleanDate = (message) => {
    if (this.props.messages.length > 0) {
      let time = this.cleanTimestamp(message);
      let today = toDate(message.createdAt)
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      today = mm + '/' + dd
      return `${time} • ${today}`;
    } else {
      return null;
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
            <div className={classes.item}>
              {messages.map((message) => {
                return (
                  <Message key={uuid()} message={message} timestamp={this.cleanTimestamp(message)} fullDate={this.cleanDate(message)} />
                )
              })}
            </div>
          )}
        <div className={classes.dummy}
          ref={(element) => { this.endMessages = element }}>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
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