import React, { Component } from "react";
import { Modal, Form, Header, Button, Icon, Input } from "semantic-ui-react";

class RespondToRequest extends Component {
  constructor() {
    super();
    this.state = {
      convoID: null,
      messagetext: null,
      open: true
      //   requestID: this.props.request.id
    };
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      messagetext: e.target.value
    });
  };

  setConvoState = response => {
    this.setState = {
      ...this.state,
      convoID: response.id
    };
  };
  handleRespond = () => {
    fetch("http://localhost:3000/convos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        fromID: this.props.user.id,
        // toID: this.props.request.user.id
        toID: 2
        //using hard coded to for now until proper relationships are made
      })
    })
      .then(response => response.json())
      .then(response => setConvo)
      .then(this.handleMessage());
  };

  handleMessage = response => {
    fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        user_id: this.props.user.id,
        convo_id: response.id,
        messagetext: this.state.messagetext
      })
    })
      .then(resp => resp.json())
      .then(resp => console.log(resp[0]));
    // .then(this.close);
  };

  render() {
    return (
      <div>
        <Modal open={this.state.open} size="fullscreen">
          <Modal.Header>
            Please write a introductory message, that will begin your
            conversation with *insert their dynamic name here*
          </Modal.Header>
          <Form.Field
            control={Input}
            label="Message"
            type="text"
            id="messagetext"
            name="messagetext"
            placeholder="Hello, I'm a college student at WSU. We have online classes for the rest of the semester, so I have a lot of time on my hands. I would love to help out with community service during this crisis. If you'd like to know further about me, you can message back or text at (123) 456-7890"
            onChange={this.handleChange}
          />

          <Modal.Actions>
            <Button
              icon="check"
              content="All Done"
              onClick={this.handleRespond}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default RespondToRequest;
