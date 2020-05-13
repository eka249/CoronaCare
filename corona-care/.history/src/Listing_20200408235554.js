import React, { Component } from "react";
import { List, Button, Modal } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import OpenRequestModal from "./OpenRequestModal";
import RespondToRequest from "./RespondToRequest";

class Listing extends Component {
  constructor() {
    super();
    this.state = {
      expandedModal: false
    };
  }

  handleOpenRequest = () => {
    {
      this.setState({
        ...this.state,
        expandedModal: !this.state.expandedModal
      });
    }
  };
  // the below list returns need to have a margin on the left side of page and more clear separations between posts

  handleTriggerButton = () => {
    return;

    <div>
      <Button onClick={this.handleOpenRequest}>
        {this.props.request.title}
      </Button>
    </div>;
  };
  render() {
    return (
      <div>
        <List>
          <Router>
            <List.Item>
              <List.Content>
                <List.Header>
                  <Button onClick={this.handleOpenRequest}>
                    {this.props.request.title}
                  </Button>
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
        {/* {this.state.expandedModal ? (
          <OpenRequestModal
            user={this.props.user}
            request={this.props.request}
          />
        ) : null} */}

        <Modal trigger={<Button>Multiple Modals</Button>}>
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
      </div>
    );
  }
}

export default Listing;
