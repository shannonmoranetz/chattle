import React, { Component } from 'react';
import { connect } from 'react-redux';

export class RoomList extends Component {
  
  render() {
    return (
      <div className="RoomList">
        <ul>
          <h3>rooms:</h3>
          {this.props.rooms.map(room => {
            const active = this.props.roomId === room.id ? '-active' : '';
            return (
              <li key={room.id} className={'room' + active}>
                <a href="#" onClick={() => this.props.subscribeToRoom(room.id)}># {room.name}</a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  rooms: state.rooms
})

export default connect(mapStateToProps)(RoomList);