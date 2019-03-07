import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    left: 200,
    bottom: 20,
    border: '1px solid black',
    zIndex: theme.zIndex.drawer + 2,
    backgroundColor: 'white'
  },
  userForm: {
    width: '90%',
    paddingLeft: 5
  },
  sendButton: {
    height: '100%',
    zIndex: theme.zIndex.drawer + 3,
    width: '100%'
  },
  underline: {
    width: '200%'
  }
})

export class SendMessageForm extends Component {
  constructor() {
    super();
    this.state = {
      message: ''
    }
  }

  handleChange = (event) => {
    this.setState({ message: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    let { classes } = this.props
    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <FormControl className={classes.stickToBottom}>
          <Grid justify="space-between" container className={classes.userForm} spacing={32}>
            <Grid item xs={10} >
              <InputLabel htmlFor="message-input">message</InputLabel>
              <Input className={classes.userForm} onChange={this.handleChange}
                id="message-input"
                type="text"
                autoComplete='off'
                value={this.state.message}
                placeholder=" ..."
                autoFocus={true}
                classes={{
                  underline: classes.underline,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="secondary" className={classes.sendButton}>
                <Icon >send</Icon>
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </form>
    )
  }
}

export default withStyles(styles)(SendMessageForm)

SendMessageForm.propTypes = {
  sendMessage: PropTypes.func
}