import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCurrentUser, setError } from '../../actions';
import { avatars } from './avatars';

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      avatar: ''
    }
  }

  componentDidUpdate = () => {
    this.inputRef.focus();
  }

  handleRef = (current) => {
    this.inputRef = current;
  }

  focus = () => {
    this.inputRef.focus();
  }

  onSubmit = async (event) => {
    event.preventDefault();
    let { username, avatar } = this.state;
    try {
      await fetch('https://shannon-secret-auth.herokuapp.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, avatar })
      })
        this.props.updateCurrentUser(username);
        this.props.loginUser();
        this.props.history.push('/');
    } catch (error) {
      this.props.setError(`${error}`);
    }
  }

  onChange = (event) => {
    this.setState({ username: event.target.value.toLowerCase() });
  }

  selectAvatar = (imagePath) => {
    this.setState({ avatar: imagePath })
  }

  render() {
    return (
      <div className="UserForm">
        <div className="form-items">
          <h3>enter username:</h3>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="username"
              onChange={this.onChange}
              ref={this.handleRef}
              autoFocus
            />
          </form>
          <div className="avatars">
            <img src={avatars.llama} onClick={() => this.selectAvatar(avatars.llama)} alt='llama'/>
          </div>
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