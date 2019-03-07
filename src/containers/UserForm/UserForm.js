import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateCurrentUser, setError } from '../../actions';
import { avatars } from './avatars';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = {
  bigAvatar: {
    margin: 10,
    width: 200,
    height: 200
  }
};

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
    let { classes } = this.props;
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
          <Grid container justify="center" max-width="100%" alignItems="center" item xs={12} spacing={32}>
            {avatars.filter((avatar) => {
              return avatar !== 'https://i.imgur.com/a7Y7Yor.png'
            })
              .map((avatar, index) => {
                return (
                  <Grid item m={5} key={index}>
                    <Avatar src={avatar} className={classes.bigAvatar} onClick={() => this.selectAvatar(avatar)} alt='avatar' />
                  </Grid>
                )
              })}
          </Grid>
        </div>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  updateCurrentUser: (username) => dispatch(updateCurrentUser(username)),
  setError: (error) => dispatch(setError(error))
})

export default compose(
  withRouter,
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(UserForm);

UserForm.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  setError: PropTypes.func,
  updateCurrentUser: PropTypes.func
}