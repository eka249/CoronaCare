import React, { Component } from "react";
import {
  Form,
  Button,
  Modal,
  Select,
  Dropdown,
  Input
} from "semantic-ui-react";
import SignInModal from "./SignInModal";

class NewRequestModal extends Component {
  state = {
    first_name: "default to user's first name",
    title: "",
    description: "",
    category: "",
    location: "",
    modalOpen: false
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkIfSignedIn = () => {
    this.setState({
      modalOpen: true
    });
    if (this.props.user === null) {
      this.props.showLogInModal();
    }
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  submitNewRequest = () => {
    // e.preventDefault();
    //WHY BELOW
    this.setState({
      ...this.state,
      modalOpen: false
    });
    fetch("http://localhost:3000/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        user_ID: this.props.user.id,
        title: this.state.title,
        description: this.state.description,
        category: this.state.category,
        location: this.state.location
      })
    })
      .then(response => response.json())
      .then(() => this.props.triggerGetRequests());
  };

  modalHeader = () => {
    if (this.props.user != null) {
      return (
        <div>
          Enter Details about New Request by {this.props.user.firstName}{" "}
          {this.props.user.lastName}.
        </div>
      );
    } else return <div>Enter Details about New Request</div>;
  };

  render() {
    return (
      <div>
        <Modal
          size="large"
          onClose={this.handleClose}
          trigger={
            <Button onClick={this.checkIfSignedIn}>Create a Request</Button>
          }
          open={this.state.modalOpen}
          onClose={this.showModal}
          animated="fade"
          floaded="right"
          color="green"
          content="Create New Request"
        >
          <Modal.Header as="h3">
            {this.modalHeader()}
            {/* Enter Details about New Request by {this.props.user.firstName}{" "}
            {this.props.user.lastName} */}
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field
                control={Input}
                label="Title "
                // required
                type="text"
                placeholder="East side couple looking for grocery delivery service."
                id="title"
                name="title"
                onChange={this.handleChange}
              />
              <Form.Field
                control={Input}
                label="Description"
                type="text"
                id="description"
                name="description"
                placeholder="We have an immunocopromised parent in our household and feel unsafe going to the grocery store. We are looking for a kind volunteer to deliver a list of groceries provided every week. Preferred payment method for groceries would be Venmo. Thank you very much for reading our post!"
                onChange={this.handleChange}
              />
              <Form.Field
                control={Input}
                label="Location"
                type="text"
                id="location"
                name="location"
                placeholder="East Wichita"
                onChange={this.handleChange}
              />
              {/* all below radio buttons need to be fixed */}
              <Form.Group inline>
                <label>Category</label>
                <Form.Radio
                  label="Delivery"
                  name="delivery"
                  value="delivery"
                  checked={this.state.role == "delivery"}
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label="DIY Products"
                  name="diy"
                  checked={this.state.role === "diy"}
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label="Household Chores"
                  name="chores"
                  checked={this.state.role === "chores"}
                  onChange={this.handleChange}
                />
                <Form.Radio
                  label="Misc"
                  name="misc"
                  checked={this.state.role === "misc"}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            {/* submit button below needs a different color and break before statement */}
            <Button onClick={this.submitNewRequest}>
              Submit (submitting this request will make all information above
              public on this site. No personal information will be shared)
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
export default NewRequestModal;
