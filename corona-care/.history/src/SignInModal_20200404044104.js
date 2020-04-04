import { React, Component } from "react";
import { Modal, Form, Header, Button } from "semantic-ui-react";

class SignInModal extends Component {
  state = {
    username: "",
    password: ""
  };
  handleChange = e => {
    let inputVal = e.target.name;
    this.setState({ ...this.state, [inputVal]: e.target.value });
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
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.jwt) {
          localStorage.setItem("token", json.jwt);
          this.props.getLoggedIn(json);
          this.setState({ role: json.user.role });
        }
      })
      .then(() => this.props.history.push(`/${this.state.role}`));
  };

  render() {
    return (
      <Modal
        // as={Form}
        // onSubmit={e => this.handleSignUp(e)}
        open={true}
        size="tiny"
        // closeIcon={this.props.showModal}
        className="c-modal"
      >
        <Header content="Sign In" as="h2"></Header>
        <Modal.Content>
          <Form.Input
            label="Username "
            // required
            type="text"
            placeholder="Username"
            id="username"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password "
            // required
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
            label="Your Name"
            // required
            type="text"
            placeholder="User"
            name="newName"
            id="newName"
            // value={this.state.newUser.newName}
            onChange={this.handleChange}
          />
          <Form.Input
            label=" New username "
            // required
            type="text"
            placeholder="Username"
            name="newUsername"
            id="newUsername"
            // value={this.state.newUser.newUsername}
            onChange={this.handleChange}
          />
          <Form.Input
            label=" New password "
            // required
            type="password"
            placeholder="Password"
            name="newPassword"
            id="newPassword"
            // value={this.state.newUser.newPassword}
            onChange={this.handleChange}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            // type="submit"
            // onClick={this.handleSignUp}
            color="green"
            icon="pencil"
            content="Sign Up!"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default SignInModal;
