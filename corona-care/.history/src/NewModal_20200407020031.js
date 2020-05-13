import React, { Component } from "react";
import {
  Form,
  Button,
  Modal,
  Select,
  Dropdown,
  Input
} from "semantic-ui-react";

class NewModal extends Component {
  state = {
    first_name: "default to user's first name",
    title: "",
    description: "",
    category: "",
    location: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  submitNewRequest = () => {
    // e.preventDefault();
    console.log("started new request without being a user");
    fetch("http://localhost:3000/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        title: this.state.title,
        password_digest: this.state.password,
        description: this.state.description,
        category: this.state.category,
        location: this.state.location
      })
    })
      .then(response => response.json())
      .then(() => this.props.getRequests())
      .then(this.showModal());
  };

  render() {
    return (
      <div>
        <Modal
          size="large"
          trigger={<Button onClick={this.showModal}>Create a Request</Button>}
          open={this.state.modalOpen}
          onClose={this.showModal}
          animated="fade"
          floaded="right"
          color="green"
          content="Create New User"
        >
          <Modal.Header as="h3">Enter New Request Details</Modal.Header>
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
                label="First Name"
                type="text"
                id="first_name"
                name="first_name"
                placeholder="Jane"
                onChange={this.handleChange}
              />

              <Form.Field
                control={Input}
                label="Last Initial"
                type="text"
                id="last_initial"
                name="last_initial"
                placeholder="D"
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
            </Form>
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
                label="Misc"
                name="misc"
                checked={this.state.role === "misc"}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleFrontEndSubmit}>Submit</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
export default NewModal;
