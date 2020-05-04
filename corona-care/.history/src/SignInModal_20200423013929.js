import React, { Component } from "react";
import { Modal, Form, Header, Button } from "semantic-ui-react";

class SignInModal extends Component {
  state = {
    email: "",
    password: "",
    newFirstName: "",
    newLastName: "",
    newEmail: "",
    newPhone: "",
    newPassword: "",
    newCity: "",
    open: true,
  };

  // *************
  // <Form.Group unstackable widths={2}/>
  // ***************
  handleChange = (e) => {
    let inputVal = e.target.name;
    this.setState({ ...this.state, [inputVal]: e.target.value });
  };

  handleSignIn = (e) => {
    this.setState({
      ...this.state,
      open: false,
    });
    //routes to user_token on backend to create token
    fetch("http://localhost:3000/user_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify({
        auth: { email: this.state.email, password: this.state.password },
      }),
    })
      .then((response) => response.json())
      .then((response) => this.handleToken(response));
  };

  handleToken = (response) => {
    //avoids saving in local storage
    let inMemoryToken = {
      token: response.jwt,
      // ,expiry: jwt_token_expiry
      //finish this expiry once i read documentation
    };
    this.props.handleClickSignIn(response, inMemoryToken);

    // if (!noRedirect) {
    //   Router.push('/app')
    // }
  };

  handleSignUp = () => {
    this.setState({
      ...this.state,
      password: this.state.newPassword,
      email: this.state.newEmail,
      open: false,
    });
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        firstName: this.state.newFirstName,
        password: this.state.newPassword,
        lastName: this.state.newLastName,
        phone: this.state.newPhone,
        email: this.state.newEmail,
        city: this.state.newCity,
      }),
    })
      .then((response) => response.json())
      .then(this.handleSignIn);
  };

  render() {
    return (
      <Modal open={this.state.open}>
        <Header content="Sign In" as="h2"></Header>
        <Modal.Content>
          <Form.Input
            label="Email "
            name="email"
            // required
            type="text"
            placeholder="Email"
            id="email"
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
            label=" New Email "
            // required
            type="text"
            placeholder="jane1978"
            name="newEmail"
            id="newEmail"
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
