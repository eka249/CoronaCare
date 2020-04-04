import { React, Component } from "react";
import {
  Form,
  Header,
  Button,
  Input,
  Divider,
  Grid,
  Segment,
  Container
} from "semantic-ui-react";

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
      <div>
        <br />
        <br />
        <br />
        <br />
        <Segment placeholder>
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              <Form>
                <Form.Group>
                  <Form.Field
                    name="email"
                    label="Email Address"
                    id="email"
                    control={Input}
                    fluid
                    placeholder="Your Email"
                    onChange={this.handleChange}
                    width={7}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Field
                    label="Password"
                    name="password"
                    id="password"
                    control={Input}
                    fluid
                    type="password"
                    placeholder="Your Password"
                    onChange={this.handleChange}
                    width={6}
                  ></Form.Field>
                </Form.Group>
              </Form>
              <Button onClick={e => this.handleSubmit(e)}>Submit</Button>
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              <Container textAlign="center">
                <p>
                  Admin Views <br />
                  username: 1@1.com <br />
                  password: 1234
                </p>
                <p>
                  Manager Views <br />
                  username: 2@2.com <br />
                  password: 1234
                </p>
                <p>
                  Employee Views <br />
                  username: 7@7.com <br />
                  password: 1234
                </p>
                <br />
                <br />

                <p>
                  ....or make another user in the Admin Account! <br />
                  Passwords default to 123456789a!
                </p>
              </Container>
            </Grid.Column>
          </Grid>
          <Divider vertical>Thank you for visiting!</Divider>
        </Segment>
      </div>
    );
  }
}

export default SignInModal;
