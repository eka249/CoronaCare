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

  respondToRequest = () => {
    this.setState({
      ...this.state,
      expandedModal: true
    });

    this.state.expandedModal ? (
      // return (
      //this child is the 2nd modal; it is triggered by the button "Respond to this request", which is listed uder requeset info
      <RespondToRequest user={this.props.user} />
    ) : // )
    null;
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
          <Button position="right" onClick={this.respondToRequest}>
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
