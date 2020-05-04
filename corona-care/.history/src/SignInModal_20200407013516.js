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

  handleSignIn = e => {
    // e.preventDefault();
    //routes to auth#create on backend to recieve token
    console.log("hit handleSignIN");
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

      .then(response => {
        if (response.jwt) {
          localStorage.setItem("token", response.jwt);
        }
      })
      .then(response => console.log("jwt from response", response.jwt))
      .then(response => console.log("user from response", response.user))
      .then(response => this.props.handleClickSignIn(response));
  };

  handleSignUp = () => {
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
      .then(() => this.props.handleClickSignIn());
  };

  render() {
    return (
      <Modal
        open={this.state.open}
        //this is the reason why the modal isn't working; need to have an even that sets open as false when clicking outside object
        // size="tiny"
        // closeIcon={this.setState({
        //   ...this.state,
        //   open: false
        // })}
        // trigger={this.state.open}
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
            onClick={
              this.handleSignIn
              // , () => this.props.handleClickSignIn)
            }
          />
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
          <Button
            // type="submit"
            onClick={this.handleSignUp}
            content="Sign Up"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default SignInModal;
