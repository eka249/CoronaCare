import React, { Component } from "react";
import SignInModal from "./SignInModal";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NewRequestModal from "./NewRequestModal";
import { Input, Menu } from "semantic-ui-react";

class NavBar extends Component {
  state = {
    activeItem: "home",
    showNewModal: false,
    showSignInModal: false,
    showNewRequestModal: false,
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
    this.props.getLoggedIn(response);
    {
      this.setState({ ...this.state, showSignInModal: false });
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
                <Menu.Item
                  name="home"
                  active={activeItem === "home"}
                  onClick={this.handleItemClick}
                >
                  <Link to="/"> CoronaCare</Link>
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
                    // onClick={this.props.signOut}
                  ></Menu.Item>
                </Menu.Menu>
              </Menu>
            </nav>
          </Router>

          {this.state.showSignInModal ? (
            <SignInModal handleClickSignIn={this.handleClickSignIn} />
          ) : null}
          {this.state.showNewRequestModal ? (
            <NewRequestModal user={this.props.user} />
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
                onClick={console.log(
                  // "pressed login "
                  // ,
                  this.state.showSignInModal
                )}
                // {this.setState({
                //   ...this.state,
                //   showSignInModal: true
                // })}
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
