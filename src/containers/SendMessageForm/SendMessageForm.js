import React, { Component } from 'react'

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
    
  }

  render() {
    return (
      <form className="SendMessageForm" onSubmit={this.handleSubmit}>
          <input  onChange={this.handleChange}
                  placeholder="message"
                  type="text" 
                  value={this.state.message}
          />
      </form>
    )
  }
}

export default SendMessageForm;