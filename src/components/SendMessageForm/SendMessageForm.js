import React, { Component } from 'react'

export class SendMessageForm extends Component {
  constructor() {
    super();
    this.state = {
      message: ''
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

  handleChange = (event) => {
    this.setState({ message: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    return (
      <form className="SendMessageForm" onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange}
          placeholder="message"
          type="text"
          value={this.state.message}
          ref={this.handleRef}
          autoFocus
        />
      </form>
    )
  }
}

export default SendMessageForm;