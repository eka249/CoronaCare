import React, { Component } from "react";
import ReactDOM from "react-dom";
import List from "./List";
import NewModal from "./NewModal";
// import { Button } from "semantic-ui-react";
// import signInModal from "./signInModal";
import NavBar from "./NavBar";

// import "semantic-ui-css/semantic.min.css";

class App extends Component {
  constructor() {
    super();
    this.getRequests();
    this.state = {
      username: "",
      password: "",
      newUsername: "",
      newPassword: "",
      requests: [],
      logged_in: false,
      user: []
    };
  }

  getLoggedIn = response => {
    console.log(response);
    this.setState({
      ...this.state,
      logged_in: true
      // ,
      // user: response.user
    });
  };

  getRequests = () => {
    fetch("http://localhost:3000/requests", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ ...this.state, requests: data }));
  };

  render() {
    return (
      <div>
        <div>
          <NavBar
            logged_in={this.state.logged_in}
            getLoggedIn={this.getLoggedIn}
          />
        </div>
        <h2>Please help support your local Wichita community.</h2>
        <List requests={this.state.requests} />
        <NewModal logged_in={this.state.logged_in} />
      </div>
    );
  }
}

export default App;
