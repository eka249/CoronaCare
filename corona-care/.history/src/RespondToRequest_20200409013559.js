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

  setConvoState = response => {
    this.setState = {
      ...this.state,
      convoID: response.id
    };
  };
  handleRespond = () => {
    fetch("http://localhost:3000/convos/create", {
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
      .then(response => this.setConvoState(response))
      .then(() => this.handleMessage());
  };

  handleMessage = () => {
    fetch("http://localhost:3000/messages/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        user_id: this.props.user.id,
        convo_id: this.state.convoID,
        messagetext: this.state.messagetext
      })
    })
      .then(response => response.json())
      .then(this.close);
  };

  render() {
    console.log("should be rendering");
    return (
      <div>
        <Modal open={true}>
          <Modal.Header>HEY HEY</Modal.Header>
        </Modal>
        <Modal show={this.state.open} size="fullscreen">
          <Modal.Header>
            Please write a introductory message, that will begin your
            conversation with *insert their dynamic name here*
          </Modal.Header>
          {/* <Form.Field
          control={Input}
          label="Message"
          type="text"
          id="messagetext"
          name="messagetext"
          placeholder="Hello, I'm a college student at WSU. We have online classes for the rest of the semester, so I have a lot of time on my hands. I would love to help out with community service during this crisis. If you'd like to know further about me, you can message back or text at (123) 456-7890"
          onChange={this.handleChange}
        /> */}
          <Modal.Content>
            <p>Submit Message to Requester!</p>
          </Modal.Content>
          {/* <Modal.Actions>
          <Button
            icon="check"
            content="All Done"
            onClick={this.handleMessage}
          />
        </Modal.Actions> */}
        </Modal>
      </div>
    );
  }
}

export default RespondToRequest;
