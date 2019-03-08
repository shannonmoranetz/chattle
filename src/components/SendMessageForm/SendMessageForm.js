import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';

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
    this.props.sendMessage(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    let { classes } = this.props
    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <FormControl className={classes.stickToBottom}>
              <InputLabel htmlFor="message-input" className={classes.label}>Type a message...</InputLabel>
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