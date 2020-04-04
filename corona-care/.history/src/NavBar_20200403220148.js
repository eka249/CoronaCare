import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import NewModal from "./newModal";
import { Menu } from "semantic-ui-react";

class NavBar extends Component {
  state = { activeItem: "home", showNewModal: false };

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
      .then(json => {
        if (json.jwt) {
          localStorage.setItem("token", json.jwt);
          //user then will send the token json to sign in function
          this.getLoggedIn(json);
        }
      })
      .then(this.setState({ activeItem: name }));
  };

  getLoggedIn = json => {
    fetch("http://localhost:3000/");
  };

  render() {
    const { activeItem } = this.state;
    // if (this.state.showNewModal === true) {
    //   return <NewModal />;
    // }
    //decided not to put modal as onClick in navbar; will have a constant button for prominence

    return (
      <div>
        <Router>
          <nav>
            <Menu>
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

              <Menu.Item
                name="TEST LOGIN"
                active={activeItem === "Logout"}
                onClick={this.handleSignIn}
              ></Menu.Item>

              <Menu.Item
                name="Logout"
                active={activeItem === "Logout"}
                onClick={this.handleItemClick}
                //finish log out onClick when user is set up
              ></Menu.Item>
            </Menu>
          </nav>
        </Router>
      </div>
    );
  }
}

export default NavBar;
