import React, { Component } from "react";
import { Modal, Form, Header, Button } from "semantic-ui-react";

class SignInModal extends Component {
  state = {
    username: "",
    password: "",
    newFirstName: "",
    newLastName: "",
    newUsername: "",
    newPhone: "",
    newPassword: "",
    newCity: "",
    open: true
  };
  handleChange = e => {
    let inputVal = e.target.name;
    this.setState({ ...this.state, [inputVal]: e.target.value });
  };
  sendToLogIn = response => {
    console.log("response at sendtologin", response);
    if (response.jwt) {
      localStorage.setItem("token", response.jwt);
      this.props.handleUserState(response);
    }
  };

  handleSignIn = e => {
    // e.preventDefault();
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
      // .then(response => this.sendToLogIn(response));
      .then(response => {
        if (response.jwt) {
          localStorage.setItem("token", response.jwt);
          this.props.handleUserState(response);
        }
      })
      .then(
        this.setState({
          open: false
        })
      );
  };

  handleSignUp = () => {
    this.setState({
      ...this.state,
      password: this.state.newPassword,
      username: this.state.newUsername
    });
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        firstName: this.state.newFirstName,
        password: this.state.newPassword,
        lastName: this.state.newLastName,
        phone: this.state.newPhone,
        username: this.state.newUsername,
        city: this.state.newCity
      })
    })
      .then(response => response.json())
      .then(this.handleSignIn);
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