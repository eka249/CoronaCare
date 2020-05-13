import React, { Component } from "react";
import { Modal, Form, Header, Button } from "semantic-ui-react";

class SignInModal extends Component {
  constructor() {
    super();
    console.log(this.props.request);
    this.state = {
      convoID: null,
      messagetext: null,
      open: false
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
    }).then(response => response.json());
  };

  render() {
    return (
      <Modal open={this.state.open}>
        <Header content="Sign In" as="h2"></Header>
        <Modal.Content>
          <Form.Input
            label="Username "
            name="username"
            // required
            type="text"
            placeholder="Username"
            id="username"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password "
            // required
            name="password"
            type="password"
            placeholder="Password"
            id="password"
            onChange={this.handleChange}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button content="Sign In" onClick={this.handleSignIn} />
        </Modal.Actions>
        <Modal.Content>
          <Header content="Or Sign Up!" as="h2"></Header>

          <Form.Input
            label="Your First Name "
            // required
            type="text"
            placeholder="Jane"
            name="newFirstName"
            id="newFirstName"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Your Last Initial "
            // required
            type="text"
            placeholder="D"
            name="newLastName"
            id="newLastName"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Your Phone Number (will not be shared with other site users) "
            // required
            type="text"
            placeholder="2223334444"
            name="newPhone"
            id="newPhone"
            onChange={this.handleChange}
          />
          <Form.Input
            label="City "
            // required
            type="text"
            placeholder="Wichita"
            name="newCity"
            id="newCity"
            onChange={this.handleChange}
          />
          <Form.Input
            label=" New username "
            // required
            type="text"
            placeholder="jane1978"
            name="newUsername"
            id="newUsername"
            onChange={this.handleChange}
          />
          <Form.Input
            label=" New password "
            // required
            type="password"
            placeholder="Password"
            name="newPassword"
            id="newPassword"
            onChange={this.handleChange}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleSignUp} content="Sign Up" />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default SignInModal;
