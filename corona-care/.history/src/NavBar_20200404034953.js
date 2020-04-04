import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import NewModal from "./newModal";
import { Input, Menu } from "semantic-ui-react";

class NavBar extends Component {
  state = {
    activeItem: "home",
    showNewModal: false,
    logged_in: false,
    user: []
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  handleNewRequest = (e, { name }) => {
    this.setState({ activeItem: name, showNewModal: true });
  };

  handleSignIn = (e, { name }) => {
    // user will sign in and recieve token if user is valid
    e.preventDefault();

    fetch("http://localhost:3000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        // username: this.state.username,
        // password: this.state.password
        username: "eka249",
        password: "1234"
      })
    })
      .then(response => response.json())
      .then(response => console.log("this is the response", response))
      .then(json => {
        if (json.jwt) {
          localStorage.setItem("token", json.jwt);
          //user then will send the token json to sign in function to recieve user data
          this.getLoggedIn(json);
        }
      })
      .then(this.setState({ activeItem: name }));
  };

  getLoggedIn = data => {
    fetch(
      "http://localhost:3000/user/profile",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
          Authorization: `Bearer ${localStorage.token}`
        }
      }.then(response => response.json())
    ).then(this.setState({ user: data.user, logged_in: true }));
  };

  render() {
    const { activeItem } = this.state;
    // if (this.state.showNewModal === true) {
    //   return <NewModal />;
    // }
    //decided not to put modal as onClick in navbar; will have a constant button for prominence

    if (this.state.logged_in) {
      return (
        <div>
          <Router>
            <nav>
              <Menu>
                <Menu.Item>CoronaCare</Menu.Item>
                <Menu.Item
                  name="home"
                  active={activeItem === "home"}
                  onClick={this.handleItemClick}
                >
                  <Link to="/"> Home </Link>
                </Menu.Item>
                <Menu.Item
                  name="Messages"
                  active={activeItem === "Create a Request"}
                  onClick={this.handleItemClick}
                >
                  <Link to="/messages">Messages</Link>
                </Menu.Item>
                <Menu.Menu position="right">
                  <Menu.Item>
                    <Input icon="search" placeholder="Search..." />
                  </Menu.Item>
                  <Menu.Item
                    name="Logout"
                    active={activeItem === "Logout"}
                    onClick={this.handleItemClick}
                    //finish log out onClick when user is set up
                  ></Menu.Item>
                </Menu.Menu>
              </Menu>
            </nav>
          </Router>
        </div>
      );
    }

    return (
      <div>
        {/* <Router> */}
        <nav>
          <Menu>
            <Menu.Item>CoronaCare</Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item
                name="Log In"
                active={activeItem === "Log In"}
                onClick={this.handleItemClick}
                //finish log out onClick when user is set up
              ></Menu.Item>
            </Menu.Menu>
          </Menu>
        </nav>
        {/* </Router> */}
      </div>
    );
  }
}

export default NavBar;
