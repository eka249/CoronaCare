import React, { Component } from "react";
import NavBar from "./NavBar";
import List from "./List";
import SignInModal from "./SignInModal";
import { Input, Menu, Image } from "semantic-ui-react";
// import "semantic-ui-css/semantic.min.css";
import Messages from "./Messages";

class App extends Component {
  constructor() {
    super();

    this.state = {
      requests: null,
      logged_in: false,
      user: null,
      myconvos: false,
      myprofile: false,
      home: true
    };
    this.getRequests();
  }

  handleRedirect = value => {
    console.log("hit handleredirect in app. value coming in:", value);
    this.setState({
      ...this.state,
      value: !this.state.value
    });
  };
  changeDataState = data => {
    //needed an extra function because .then() was exceeding in componentDidMount
    this.setState({
      ...this.state,
      requests: data
    });
    console.log("state afterSetting it", this.state);
  };
  showLogInModal = () => {
    //after onClick of "LogIn"
    this.setState({
      ...this.state,
      showSignInModal: true
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
      .then(data => this.changeDataState(data));
  };

  homePage = () => {
    return (
      <React.Fragment>
        <h3>Please help support your local Wichita community</h3>
        <List requests={this.state.requests} user={this.state.user} />
      </React.Fragment>
    );
  };

  handleUserState = response => {
    this.setState({
      ...this.state,
      logged_in: true,
      user: response.user
    });
    console.log(
      "hit handleusersteate in app",
      response,
      "response.user:",
      response.user,
      "state afterSetting it",
      this.state
    );
  };

  showMessages = () => {
    return <Messages user={this.props.user} />;
  };

  showProfile = () => {
    console.log("profile work here");
  };

  // signOut = () => {
  //   console.log("hit sign out in app");
  //   localStorage.removeItem("token");
  //   this.setState({ ...this.state, logged_in: false, user: null });
  // };

  navBar = () => {
    return (
      <NavBar
        user={this.state.user}
        requests={this.state.requests}
        logged_in={this.state.logged_in}
        changeLogInState={this.changeLogInState}
        getRequests={this.getRequests}
        handleUserState={this.handleUserState}
        signOut={this.signOut}
        handleRedirect={this.handleRedirect}
      />
    );
  };

  render() {
    // const { activeItem } = this.state;
    if (!this.state.showMessages && !this.state.showProfile) {
      return (
        <React.Fragment>
          {this.navBar()}
          {this.homePage()}
        </React.Fragment>
      );
    } else if (this.state.showMessages) {
      return (
        <React.Fragment>
          {this.navBar()}
          {this.showMessages()}
        </React.Fragment>
      );
    } else
      return (
        <React.Fragment>
          {this.navBar()}
          {this.showProfile()}
        </React.Fragment>
      );
  }
}

export default App;
