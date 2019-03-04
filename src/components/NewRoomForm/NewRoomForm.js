import React, { Component } from 'react';
import { connect } from 'react-redux';

export class NewRoomForm extends Component {
  constructor() {
    super();
    this.state = {
      roomName: '',
      duplicateSubmitted: false
    }
  }

  handleChange = (event) => {
    this.setState({ roomName: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const name = this.state.roomName.toLowerCase();
    try {
      this.setState({ duplicateSubmitted: false })
      this.props.rooms.forEach((room) => {
        if (room.name.includes(name)) {
          throw new Error('room already exists');
        }
      })
      this.props.createRoom(this.state.roomName.toLowerCase())
      this.setState({ roomName: '' })
      this.moveBack();
    } catch (error) {
      this.setState({ duplicateSubmitted: true })
      console.log('Error: ', error)
    }
  }

  // router may deprecate this
  moveBack = () => {
    this.props.updateDisplay();
  }

  render() {
    const { roomName, duplicateSubmitted } = this.state;
    return (
      <div className="NewRoomForm">
        { duplicateSubmitted && <p>room already exists</p> }
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange}
            type="text"
            value={roomName}
            placeholder="new room"
            required
          />
          <button id="create-room" type="submit">+</button>
        </form>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  rooms: state.rooms
})

export default connect(mapStateToProps)(NewRoomForm);