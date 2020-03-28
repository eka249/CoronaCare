import React, { Component } from "react";
import ReactDOM from "react-dom";
import List from "./List";
// import { Button } from "semantic-ui-react";
// import signInModal from "./signInModal";
import NavBar from "./NavBar";

// import "semantic-ui-css/semantic.min.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      newUsername: "",
      newPassword: "",
      showSignInModal: false
    };
  }

  showSignInModal() {
    this.setState({
      showSignInModal: !this.state.showSignInModal
    });
  }

  render() {
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <h1>CoronaCare</h1>
        <br></br>
        <h2>Please help support your local Wichita community.</h2>
        <List />
      </div>
    );
  }
}

export default App;
