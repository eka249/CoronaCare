import React, { Component } from "react";
import SignInModal from "./SignInModal";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import NewModal from "./newModal";
import { Input, Menu } from "semantic-ui-react";

class NavBar extends Component {
  state = {
    activeItem: "home",
    showNewModal: false,
    showSignInModal: false,
    logged_in: this.props.logged_in,
    user: [],
    username: "",
    password: ""
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  handleNewRequest = (e, { name }) => {
    this.setState({ activeItem: name, showNewModal: true });
  };

  handleClickSignIn = response => {
    console.log("response coming into navbar", response);
    this.props.getLoggedIn(response);
    {
      this.setState({
        showSignInModal: !this.state.showSignInModal
      });
    }
  };

  render() {
    const { activeItem } = this.state;

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

          {this.state.showSignInModal ? (
            <SignInModal handleClickSignIn={this.handleClickSignIn} />
          ) : null}
        </div>
      );
    }

    return (
      <div>
        <nav>
          <Menu>
            <Menu.Item>CoronaCare</Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item
                name="Log In"
                active={activeItem === "Log In"}
                onClick={this.handleClickSignIn}
              ></Menu.Item>
            </Menu.Menu>
          </Menu>
        </nav>
        {this.state.showSignInModal ? (
          <SignInModal handleClickSignIn={this.handleClickSignIn} />
        ) : null}
      </div>
    );
  }
}

export default NavBar;
