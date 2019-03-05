import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setError } from '../../actions';
import PropTypes from 'prop-types';

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
    let { roomName } = this.state;
    let { rooms, createRoom, setError } = this.props;
    event.preventDefault();
    const name = roomName.toLowerCase();
    try {
      this.setState({ duplicateSubmitted: false })
      rooms.forEach((room) => {
        if (room.name.includes(name)) {
          throw new Error('room already exists');
        }
      })
      createRoom(roomName.toLowerCase())
      this.setState({ roomName: '' })
      this.moveBack();
    } catch (error) {
      this.setState({ duplicateSubmitted: true })
      setError(`${error}`)
    }
  }

  moveBack = () => {
    this.props.updateDisplay();
  }

  render() {
    const { roomName, duplicateSubmitted } = this.state;
    return (
      <div className="NewRoomForm">
        {duplicateSubmitted && <p>room already exists</p>}
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange}
            type="text"
            value={roomName}
            placeholder="new room"
            required
          />
        </form>
        <div onClick={this.moveBack}>back</div>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  rooms: state.rooms
})

export const mapDispatchToProps = (dispatch) => ({
  setError: (error) => dispatch(setError(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewRoomForm);

NewRoomForm.propTypes = {
  createRoom: PropTypes.func,
  setError: PropTypes.func,
  updateDisplay: PropTypes.func,
  rooms: PropTypes.array
}