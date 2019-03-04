import React, { Component } from 'react'

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onUsernameSubmitted(this.state.username);
  }

  onChange = (event) => {
    this.setState({ username: event.target.value });
  }

  render() {
    return (
      <div>
        <div>
          <h3>enter username:</h3>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="username"
              onChange={this.onChange}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default UserForm;