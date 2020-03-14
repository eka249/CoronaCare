import React, { Component } from "react";
import "./App.css";
import { Button } from "semantic-ui-react";
import RequesterModal from "./RequesterModal";
import VolunteerModal from "./VolunteerModal";
// import "semantic-ui-css/semantic.min.css";

class App extends Component {
  state = {
    username: "",
    password: "",
    newUsername: "",
    newPassword: "",
    showVolunteerModal: false,
    showRequesterModal: false
  };

  showVolunteerModal = () => {
    this.setState({
      ...this.state,
      showVolunteerModal: !this.state.showVolunteerModal
    });
  };

  showRequesterModal = () => {
    this.setState({
      ...this.state,
      showRequesterModal: !this.state.showRequesterModal
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img
          src="https://media.giphy.com/media/WrxoaVPiq0cG4/giphy.gif"

        /> */}
          <p>CoronaCare</p>
          <br></br>
          <p>*Placeholder inspirational quote*</p>
          <Button.Group>
            <Button onClick={this.showVolunteerModal()}>
              Volunteer My Services
            </Button>
            <Button onClick={this.showRequesterModal()}>
              Request a Service
            </Button>
          </Button.Group>
          ;
          <RequesterModal />
          <VolunteerModal />
        </header>
      </div>
    );
  }
}
export default App;
