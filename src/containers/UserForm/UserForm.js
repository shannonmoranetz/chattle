import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCurrentUser, setError } from '../../actions';
import { avatars } from './avatars';
import PropTypes from 'prop-types';

class UserForm extends Component {
  constructor() {
    super()
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
    let { username, avatar } = this.state;
    let { updateCurrentUser, loginUser, history, setError } = this.props;
    event.preventDefault();
    try {
      await fetch('https://chattle-auth.herokuapp.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, avatar })
      })
      updateCurrentUser(username);
      loginUser();
      history.push('/');
    } catch (error) {
      setError(`${error}`);
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
            <img src={avatars.llama} onClick={() => this.selectAvatar(avatars.llama)} alt='llama' />
            <img src={avatars.pig} onClick={() => this.selectAvatar(avatars.pig)} alt='pig' />
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

UserForm.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  setError: PropTypes.func,
  updateCurrentUser: PropTypes.func
}