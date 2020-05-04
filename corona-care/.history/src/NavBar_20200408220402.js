import React, { Component, Redirect } from "react";

import SignInModal from "./SignInModal";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import NewRequestModal from "./NewRequestModal";
import { Input, Menu } from "semantic-ui-react";
import Messages from "./Messages";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: "home",
      showNewModal: false,
      showSignInModal: false,
      showNewRequestModal: false,
      username: "",
      password: ""
    };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  changeLogInState = () => {
    {
      this.setState({
        ...this.state,
        showSignInModal: !this.state.showSignInModal
      });
    }
  };

  handleNewRequest = (e, { name }) => {
    this.setState({ activeItem: name, showNewModal: !this.state.showNewModal });
  };

  handleClickSignIn = response => {
    this.props.getLoggedIn(response);
    {
      this.setState({
        ...this.state,
        showSignInModal: !this.state.showSignInModal
      });
    }
  };

  render() {
    const { activeItem } = this.state;

    if (this.props.logged_in) {
      return (
        <div>
          <Router>
            <nav>
              <Menu>
                <React.Fragment>
                  <Menu.Item
                    name="home"
                    active={activeItem === "home"}
                    onClick={this.handleItemClick}
                  >
                    <Link to="/"> CoronaCare</Link>
                  </Menu.Item>
                </React.Fragment>
                <React.Fragment>
                  <Menu.Item
                    name="messages"
                    active={activeItem === "messages"}
                    onClick={this.handleItemClick}
                  >
                    {/* <Link to="/myconvos">Messages</Link> */}
                    <Route exact path="/myconvos">
                      <Messages user={this.props.user} />
                    </Route>
                    {/* render={routeProps => (
                        <Messages {...routeProps} user={this.props.user} />
                      )} */}
                    {/* /> */}
                  </Menu.Item>
                </React.Fragment>

                <Menu.Menu position="right">
                  <Menu.Item>
                    <Input icon="search" placeholder="Search..." />
                  </Menu.Item>
                  <React.Fragment>
                    <Menu.Item
                      name="Logout"
                      active={activeItem === "Logout"}
                      onClick={this.handleItemClick}
                      // onClick={this.props.signOut}
                    ></Menu.Item>
                  </React.Fragment>
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
                onClick={this.changeLogInState}
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
