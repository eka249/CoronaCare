import React, { Component } from "react";
import List from "./List";
import NewRequestModal from "./NewRequestModal";
import NavBar from "./NavBar";
import Messages from "./Messages";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import "semantic-ui-css/semantic.min.css";

class App extends Component {
  constructor() {
    super();
    this.getRequests();
    this.state = {
      requests: [],
      logged_in: false,
      user: null
    };
  }

  getLoggedIn = response => {
    this.setState({
      ...this.state,
      logged_in: true,
      user: response.user
    });
    // fetch("http://localhost:3000/user/profile",{
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accepts: "application/json",
    //     Authorization: `Bearer ${localStorage.token}`
    //   },

    // })
    // .then(response=>response.json())
  };
  // signOut = () => {
  //   localStorage.removeItem("token");
  //   this.setState({ ...this.state, logged_in: false, user: null });
  // };

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
            user={this.state.user}
            signOut={this.signOut}
          />
        </div>
        <NewRequestModal
          user={this.state.user}
          logged_in={this.state.logged_in}
          getRequests={this.getRequests}
        />
        <h2>Please help support your local Wichita community.</h2>
        <List requests={this.state.requests} />

        {/* <div>
          <Router>
            <div className="app">
              <NavBar />
              <Route exact path="/" component={Home} />
              <Route exact path="/myconvos" component={Messages} />
              {/* <Route exact path="/directors" component={Directors} />
              <Route exact path="/movies" component={Movies} /> */}
        {/* </div>
          </Router> */}
        {/* </div> */}
      </div>
    );
  }
}

export default App;