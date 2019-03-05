import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCurrentRoom } from '../../actions';
import NewRoomForm from '../NewRoomForm/NewRoomForm';
import PropTypes from 'prop-types';

export class RoomList extends Component {
  constructor() {
    super();
    this.state = {
      showNewRoomForm: false
    }
  }

  handleClick = () => {
    this.setState({ showNewRoomForm: !this.state.showNewRoomForm });
    this.props.updateCurrentRoom('');
  }

  render() {
    let { createRoom, rooms, currentRoomId, subscribeToRoom } = this.props;
    return (
      <div className="RoomList">
        <h3>rooms:</h3>
        {this.state.showNewRoomForm ? (
          <NewRoomForm createRoom={createRoom}
            updateDisplay={this.handleClick} />
        ) : (
            <div className="room-items">
              <ul>
                {rooms.map(room => {
                  const active = currentRoomId === room.id ? '-active' : '';
                  return (
                    <li key={room.id} className={'room' + active}>
                      <div href="#" onClick={() => subscribeToRoom(room.id)}># {room.name}</div>
                    </li>
                  )
                })}
              </ul>
              <div onClick={this.handleClick}>create new room</div>
            </div>
          )}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  rooms: state.rooms,
  currentRoomId: state.currentRoomId
})

export const mapDispatchToProps = (dispatch) => ({
  updateCurrentRoom: (roomId) => dispatch(updateCurrentRoom(roomId))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);

RoomList.propTypes = {
  createRoom: PropTypes.func,
  currentRoomId: PropTypes.string,
  rooms: PropTypes.array,
  updateCurrentRoom: PropTypes.func,
  subscribeToRoom: PropTypes.func
}