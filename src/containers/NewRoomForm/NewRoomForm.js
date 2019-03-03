import React, {Component} from 'react';

export class NewRoomForm extends Component {
  constructor() {
    super();
    this.state = {
      roomName: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      roomName: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.createRoom(this.state.roomName)
    this.setState({ roomName: '' })
  }

  render() {
    return (
      <div className="NewRoomForm">
        <form onSubmit={this.handleSubmit}>
          <input  onChange={this.handleChange}
                  type="text"
                  value={this.state.roomName}
                  placeholder="new room"
                  required 
          />
          <button id="create-room" type="submit">+</button>
        </form>
      </div>
    )
  }
}

export default NewRoomForm;