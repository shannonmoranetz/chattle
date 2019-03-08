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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Header from '../../components/Header/Header';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  bigAvatar: {
    margin: 10,
    width: 170,
    height: 170,
    '&:hover': {
      boxShadow: '8px 8px 10px black',
      cursor: 'pointer'
    }
  },
  rightIcon: {
    marginLeft: 10
  },
  userForm: {
    textAlign: 'center',
  },
  userInput: {
    backgroundColor: 'white'
  },
  login: {
    marginTop: 15,
    marginBottom: 30

  },
  instruction: {
    marginTop: 15
  },
  divide: {
    marginBottom: 15
  },
  appBar: {
    backgroundColor: '#dedede'
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

  onSubmit = async (event) => {
    let { username, avatar } = this.state;
    let { updateCurrentUser, initializeChat, history, setError } = this.props;
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
      initializeChat();
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
      <div className={classes.root}>
        <AppBar position="relative" className={classes.appBar}>
          <Toolbar >
            <Grid container direction="column">
              <Grid item>
                <Header />
              </Grid>
              <Grid item>
                <form onSubmit={this.onSubmit} className={classes.userForm}>
                  <FormControl className={classes.userForm}>
                    <InputLabel htmlFor="login-input" show={true}>Create a user or log in</InputLabel>
                    <Input id="login-input" placeholder="Username" type="text" className={classes.userInput} onChange={this.onChange} autoFocus={true} />
                    <Button variant="contained" color="secondary" onClick={this.onSubmit} className={classes.login}>Log In!<Icon className={classes.rightIcon}>person_add</Icon></Button>
                  </FormControl>
                </form>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Typography variant="h5" gutterBottom align="center" className={classes.instruction}>
          first visit? pick a chat avatar before logging in:
        </Typography>
        <Divider className={classes.divide} />
        <Grid container justify="center" alignItems="center" >
          {avatars.filter((avatar) => {
            return avatar !== 'https://i.imgur.com/a7Y7Yor.png'
          })
            .map((avatar, index) => {
              return (
                <Grid key={index} className={classes.divide} >
                  <Avatar src={avatar} className={classes.bigAvatar} onClick={() => this.selectAvatar(avatar)} alt='avatar' />
                </Grid>
              )
            })}
        </Grid>
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