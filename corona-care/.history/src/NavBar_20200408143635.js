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

  handleMessages = () => {
    this.props.history.push("/myconvos");
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
      console.log("logged in-should show correct navbar");
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
                  name="messages"
                  active={activeItem === "messages"}
                  onClick={(this.handleItemClick, this.handleMessages)}
                  user={this.props.user}
                >
                  <NavLink to={"/myconvos"}>Messages</NavLink>
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
ReactDOM.render(
  <Router>
    <div>
      <Messages /> <Route exact path="/myconvos"></Route>
    </div>
  </Router>,
  document.getElementById("root")
);
