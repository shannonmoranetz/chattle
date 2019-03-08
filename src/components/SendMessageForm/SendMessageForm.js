import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  stickToBottom: {
    borderTop: '1px solid #dedede',
    backgroundColor: 'white',
    width: `calc(100% - ${200}px)`,
    marginLeft: 200,
    flexDirection: 'row'
  },
  userForm: {
    width: '100%',
    paddingLeft: 5,
    fontFamily: 'Roboto Condensed',
    fontSize: 30
  },
  sendButton: {
    minWidth: 90,
    borderRadius: 0
  },
  label: {
    paddingLeft: 5,
    fontFamily: 'Roboto Condensed',
    fontSize: 20
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
    if (this.state.message.length > 125) {
      alert('Messages may not exceed 125 characters. Please be more succinct!')
      return;
    }
    this.props.sendMessage(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    let { classes } = this.props;
    let { message } = this.state;
    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <FormControl error={message.length > 125 ? (true) : (false)} className={classes.stickToBottom}>
              <InputLabel htmlFor="message-input" className={classes.label}>{message.length > 125 ? ('Message too long!') : ('Type a message...')}</InputLabel>
              <Input className={classes.userForm} onChange={this.handleChange}
                id="message-input"
                type="text"
                autoComplete='off'
                value={this.state.message}
              />
        </FormControl>
              <Button variant="contained" onClick={this.handleSubmit} color="secondary" className={classes.sendButton}>
                <Icon >send</Icon>
              </Button>
      </form>
    )
  }
}

export default withStyles(styles)(SendMessageForm)

SendMessageForm.propTypes = {
  sendMessage: PropTypes.func
}