import React, { Component } from "react";
import { Modal, Form, Header, Button } from "semantic-ui-react";

class SignInModal extends Component {
  state = {
    username: "",
    password: "",
    newFirstName: "",
    newLastName: "",
    newUsername: "",
    newPhone: ""
  };
  handleChange = e => {
    let inputVal = e.target.name;
    this.setState({ ...this.state, inputVal: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    //routes to auth#create on backend to recieve token
    fetch("http://localhost:3000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.jwt) {
          localStorage.setItem("token", json.jwt);
          this.props.getLoggedIn(json);
        }
      })
      .then();
  };

  handleSignUp = () => {
    console.log("started making new user");
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        newFirstName: this.state.newFirstName,
        password_digest: this.state.password,
        newLastName: this.state.newLastName,
        newPhone: this.state.newPhone
      })
    }).then(response => response.json());
  };

  render() {
    return (
      <Modal
        // as={Form}
        // onSubmit={e => this.handleSignUp(e)}
        // open={true}
        size="tiny"
        // closeIcon={this.props.showModal}
        className="c-modal"
        trigger={<Button>Proceed</Button>}
      >
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
          <Button
            content="Sign In"
            // onClick={console.log("sign in hit")}
            // onClick={
            //   () => this.onSignIn()

            // this.props.showModal
            // }
          />
        </Modal.Actions>
        <Modal.Content>
          <Header content="Or Sign Up!" as="h3"></Header>

          <Form.Input
            label="Your First Name"
            // required
            type="text"
            placeholder="User"
            name="newFirstName"
            id="newFirstName"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Your Last Initial"
            // required
            type="text"
            placeholder="User"
            name="newLastName"
            id="newLastName"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Your Phone Number"
            // required
            type="text"
            placeholder="User"
            name="newPhone"
            id="newPhone"
            onChange={this.handleChange}
          />
          <Form.Input
            label=" New username "
            // required
            type="text"
            placeholder="Username"
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
          <Button type="submit" onClick={this.handleSignUp} content="Sign Up" />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default SignInModal;
