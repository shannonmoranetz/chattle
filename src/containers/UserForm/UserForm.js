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
import Header from '../../components/Header/Header';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import uuid from 'uuid/v4';

const styles = theme => ({
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
    },
  },
  bigAvatarActive: {
    margin: 10,
    width: 170,
    height: 170,
    boxShadow: '8px 8px 10px black',
    cursor: 'pointer'
  },
  rightIcon: {
    marginLeft: 10
  },
  userForm: {
    textAlign: 'center',
  },
  userInput: {
    backgroundColor: 'white',
    'label[data-shrink=false] + & ::-webkit-input-placeholder': {
      opacity: '0.5 !important',
  },
  paddingLeft: 5,
  fontSize: 26
  },
  login: {
    marginTop: 15,
    marginBottom: 30,
  },
  instruction: {
    marginTop: 15,
    justifyContent: 'center',
  },
  divide: {
    marginBottom: 15
  },
  appBar: {
    backgroundColor: '#dedede'
  },
  summary: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  }
});

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
    if (username.length > 10) {
      alert('Username may not exceed 10 characters. Please try again with a shorter username!')
      return;
    }
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

  selectAvatar = async (imagePath) => {
    await this.setState({ avatar: imagePath })
    this.avatarIsActive()
  }

  avatarIsActive = (avatar) => {
    if (avatar === this.state.avatar) {
      return this.props.classes.bigAvatarActive
    } else {
      return this.props.classes.bigAvatar
    }
  }

  render() {
    let { classes } = this.props;
    let { username } = this.state;
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
                  <FormControl error={username.length > 10 ? (true) : (false)} className={classes.userForm}>
                    <InputLabel htmlFor="login-input">{username.length > 10 ? ('Username too long!') : ('Create a user or log in')}</InputLabel>
                    <Input id="login-input" placeholder="Username" type="text" className={classes.userInput} onChange={this.onChange} autoFocus={true} />
                    <Button variant="contained" color="secondary" onClick={this.onSubmit} className={classes.login}>Log In!<Icon className={classes.rightIcon}>lock_open</Icon></Button>
                  </FormControl>
                </form>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <ExpansionPanel>
          <ExpansionPanelSummary className={classes.summary} justify="center" expandIcon={<ExpandMoreIcon fontSize="large"/>}>
          <Typography variant="h5" gutterBottom justify="center" className={classes.instruction}>First visit? Click to select a chat avatar before logging in:</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container justify="center" alignItems="center" >
              {avatars.filter((avatar) => {
                return avatar !== 'https://i.imgur.com/a7Y7Yor.png'
              })
                .map((avatar) => {
                  return (
                    <Grid key={uuid()} className={classes.divide} >
                      <Avatar src={avatar} className={this.avatarIsActive(avatar)} onClick={() => this.selectAvatar(avatar)} alt='avatar' />
                    </Grid>
                  )
                })}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
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