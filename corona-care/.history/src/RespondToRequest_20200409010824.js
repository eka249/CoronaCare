import React, { Component } from "react";
import { Modal, Form, Header, Button, Icon } from "semantic-ui-react";

class RespondToRequest extends Component {
  constructor() {
    console.log("hit respond to request");
    super();
    this.state = {
      convoID: null,
      messagetext: null
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
    return (
      <Modal>
        <Modal.Header>
          Please write a introductory message, that will begin your conversation
          with *insert their dynamic name here*
        </Modal.Header>
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
    );
  }
}

export default RespondToRequest;