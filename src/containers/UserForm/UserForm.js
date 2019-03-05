import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCurrentUser, setError } from '../../actions';

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
      await this.props.updateCurrentUser(username);
      await this.props.loginUser();
      this.props.history.push('/');
    } catch (error) {
      this.props.setError(`${error}`);
    }
  }

  onChange = (event) => {
    this.setState({ username: event.target.value.toLowerCase() });
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

export const mapDispatchToProps = (dispatch) => ({
  updateCurrentUser: (username) => dispatch(updateCurrentUser(username)),
  setError: (error) => dispatch(setError(error))
})

export default withRouter(connect(null, mapDispatchToProps)(UserForm));