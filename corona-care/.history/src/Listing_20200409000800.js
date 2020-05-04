import React, { Component } from "react";
import { List, Button, Modal, Icon } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import OpenRequestModal from "./OpenRequestModal";
import RespondToRequest from "./RespondToRequest";

class Listing extends Component {
  constructor() {
    super();
    this.state = {
      expandedModal: false,
      convoID: null,
      messagetext: null,
      open: false
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
  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  // the below list returns need to have a margin on the left side of page and more clear separations between posts

  handleTriggerButton = props => {
    return (
      <div>
        <Button
        // onClick={this.handleOpenRequest}
        >
          {this.props.request.title}
        </Button>
      </div>
    );
  };

  respondToRequest = () => {
    const { open } = this.state;
    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size="small"
        trigger={
          <Button primary icon>
            Respond to this request <Icon name="right chevron" />
          </Button>
        }
      >
        <Modal.Header>
          Please write a introductory message, that will begin your conversation
          with *insert their dynamic name here*
        </Modal.Header>
        <Modal.Content>
          <p>Submit Message to Requester!</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            icon="check"
            content="All Done"
            onClick={this.handleMessage}
          />
        </Modal.Actions>
      </Modal>
    );
  };
  render() {
    return (
      <div>
        <Modal trigger={this.handleTriggerButton()}>
          <Modal.Header>Modal #1</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>We have more to share with you. Follow us along to modal 2</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <RespondToRequest />
          </Modal.Actions>
        </Modal>
        <List>
          <Router>
            <List.Item>
              <List.Content>
                <List.Header>
                  {/* <Button onClick={this.handleOpenRequest}> */}
                  {/* {this.handleTriggerButton()} */}
                  {/* {this.props.request.title} */}
                  {/* </Button> */}
                  {/* <Link to={`/requests/${props.request.id}`}>
              {props.request.title}
            </Link> */}
                </List.Header>
                <List.Description>
                  {this.props.request.description}
                </List.Description>
              </List.Content>
            </List.Item>
          </Router>
        </List>
        <br></br>
        {/* {this.state.expandedModal ? (
          <OpenRequestModal
            user={this.props.user}
            request={this.props.request}
          />
        ) : null} */}
        {this.respondToRequest()}
      </div>
    );
  }
}

export default Listing;
