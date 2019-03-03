import React, { Component } from 'react';
import { connect } from 'react-redux';

export class RoomList extends Component {
  
  render() {
    return (
      <div className="RoomList">
        <ul>
          <h3>rooms:</h3>
          {this.props.rooms.map(room => {
            const active = this.props.currentRoomId === room.id ? '-active' : '';
            return (
              <li key={room.id} className={'room' + active}>
                <div href="#" onClick={() => this.props.subscribeToRoom(room.id)}># {room.name}</div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  rooms: state.rooms,
  currentRoomId: state.currentRoomId
})

export default connect(mapStateToProps)(RoomList);