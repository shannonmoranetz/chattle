import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Message from '../../components/Message/Message';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import RoomList from '../../containers/RoomList/RoomList';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';


const styles = {
  // root: {
  // }
}

export class MessageList extends Component {

  Transition = (props) => {
    return <Slide direction="down" {...props} />;
  }

  render() {
    let { currentRoomId, messages, classes, subscribeToRoom, createRoom } = this.props;
    return (
      <div className={classes.root}>
        {!currentRoomId ? (
          <Dialog keepMounted open={true}
          TransitionComponent={this.Transition} transitionDuration={1000}>
              <DialogContent>
                <RoomList subscribeToRoom={subscribeToRoom} createRoom={createRoom} />
              </DialogContent>
          </Dialog>
        ) : (
            <div className="messages">
              {messages.map((message, i) => {
                return (
                  <Message key={i} message={message} />
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