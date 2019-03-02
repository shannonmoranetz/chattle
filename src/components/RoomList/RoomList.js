import React, { Component } from 'react'

export class RoomList extends Component {
  render() {
    return (
      <div className="RoomList">
        <ul>
          <h3>rooms:</h3>
          {this.props.rooms.map(room => {
            return (
              <li key={room.id} className="room">
                <a href="#" onClick={() => this.props.subscribeToRoom(room.id)}># {room.name}</a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default RoomList;