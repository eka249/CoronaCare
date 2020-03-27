import { React, Component } from "react";
import "./App.css";
import { Button } from "semantic-ui-react";
import signInModal from "./signInModal";
import VolunteerModal from "./VolunteerModal";
import "semantic-ui-css/semantic.min.css";

class App extends React {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      newUsername: "",
      newPassword: "",
      showVolunteerModal: false,
      showSignInModal: false
    };
  }
  showVolunteerModal = () => {
    this.setState({
      ...this.state,
      showVolunteerModal: !this.state.showVolunteerModal
    });
  };

  showSignInModal = () => {
    this.setState({
      ...this.state,
      showSignInModal: !this.state.showSignInModal
    });
  };

  render() {
    return (
      <div className="App">
        <p>CoronaCare</p>
        <br></br>
        <p>Please help support your local Wichita community.</p>
        <Button.Group>
          <Button onClick={e => this.showVolunteerModal()}>
            Browse services where you can volunteer
          </Button>
          <Button onClick={e => this.showSignInModal()}>
            Request a Service
          </Button>
        </Button.Group>
      </div>
    );
  }
}

export default App;
