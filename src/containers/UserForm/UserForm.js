import React, { Component } from 'react'

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
  }

  onSubmit = async (event) => {
    let { username } = this.state;
    event.preventDefault();
    try {
      await fetch('https://shannon-secret-auth.herokuapp.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      })
      this.setState({ currentUsername: username })
    } catch (error) {
      console.log('Error on user: ', error)
    }
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