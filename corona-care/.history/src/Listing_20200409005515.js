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
  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  // the below list returns need to have a margin on the left side of page and more clear separations between posts

  handleTriggerButton = props => {
    return <div></div>;
  };

  respondToRequest = () => {
    const { open } = this.state;

    return (
      //this is the 2nd modal; it is triggered by the button "Respond to this request", which is listed uder requeset info
      <div>
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
            Please write a introductory message, that will begin your
            conversation with *insert their dynamic name here*
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
      </div>
    );
  };
  render() {
    return (
      <div>
        <Modal trigger={<Button>{this.props.request.title}</Button>}>
          <Modal.Header>Modal #1</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>We have more to share with you. Follow us along to modal 2</p>
            </Modal.Description>
          </Modal.Content>
          {/* <Modal.Actions>{this.respondToRequest}</Modal.Actions> */}
          <Button position="right" onClick={this.respondToRequest()}>
            Respond to this request.
          </Button>
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
        ) : null}{" "} */}
      </div>
    );
  }
}

export default Listing;
