import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewRoomForm from '../../components/NewRoomForm/NewRoomForm';

export class RoomList extends Component {
  constructor() {
    super();
    this.state = {
      showNewRoomForm: false
    }
  }

  handleClick = () => {
    this.setState({ showNewRoomForm: !this.state.showNewRoomForm })
  }

  render() {
    return (
      <div className="RoomList">
        <h3>rooms:</h3>
        {this.state.showNewRoomForm ? (
          <NewRoomForm createRoom={this.props.createRoom} />
        ) : (
            <div className="room-items">
              <ul>
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
          )}
        <div onClick={this.handleClick}>create new room</div>
      </div>
    )
  }
}


export const mapStateToProps = (state) => ({
  rooms: state.rooms,
  currentRoomId: state.currentRoomId
})

export default connect(mapStateToProps)(RoomList);