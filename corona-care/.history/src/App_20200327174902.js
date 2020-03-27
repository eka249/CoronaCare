import { React, Component } from "react";
import "./App.css";
// import { Button } from "semantic-ui-react";
import signInModal from "./signInModal";
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
      ...this.state,
      showSignInModal: true
    });
  }

  render() {
    return (
      <div className="App">
        <h1>CoronaCare</h1>
        <br></br>
        <h2>Please help support your local Wichita community.</h2>
        <NavBar />
      </div>
    );
  }
}

export default App;
