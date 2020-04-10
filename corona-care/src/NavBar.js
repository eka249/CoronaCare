import React, { Component, Button } from "react";
import List from "./List";
import NewRequestModal from "./NewRequestModal";
import SignInModal from "./SignInModal";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink
} from "react-router-dom";
// import NavBar from "./NavBar";
import Messages from "./Messages";
import ReactDOM from "react-dom";
import { Input, Menu, Image } from "semantic-ui-react";

// import "semantic-ui-css/semantic.min.css";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: "home",
      showNewModal: false,
      showSignInModal: false,
      showNewRequestModal: false
    };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  showLogInModal = () => {
    //after onClick of "LogIn"
    this.setState({
      ...this.state,
      showSignInModal: true
    });
  };

  handleNewRequest = e => {
    this.setState({ showNewRequestModal: !this.state.showNewRequestModal });
  };

  handleClickSignIn = response => {
    //after submitting from SignInModal, the state of showSignInModal will turn to false
    this.setState({
      ...this.state,
      showSignInModal: false
    });
    this.props.handleUserState(response);
  };

  //   signOut = () => {
  //     localStorage.removeItem("token");
  //     this.setState({ ...this.state, logged_in: false, user: null });
  //   };

  triggerGetRequests = () => {
    this.props.getRequests();
  };

  homePageNav = () => {
    return (
      <React.Fragment>
        <div>
          <Link to="/">
            <Image
              size="small"
              src="https://assets.simpleviewinc.com/simpleview/image/upload/crm/wichita/Keeper-CRM0-90eba9295056a36_90ebab7f-5056-a36a-07ed42e3ea553a4a.jpg"
              fluid
            ></Image>
          </Link>

          <Menu.Item
            name="home"
            // active={activeItem === "home"}
            onClick={this.handleItemClick}
          >
            <Link to="/"> CoronaCare</Link>
          </Menu.Item>
        </div>
        <Menu.Item onClick={this.handleItemClick}>
          <NewRequestModal
            user={this.props.user}
            logged_in={this.props.logged_in}
            getRequests={this.props.getRequests}
            showLogInModal={this.showLogInModal}
          />
        </Menu.Item>
      </React.Fragment>
    );
  };
  homePageSearch = () => {
    return (
      <Menu.Menu>
        <Menu.Item fixed="right">
          <Input icon="search" placeholder="Search Titles or Descriptions" />
        </Menu.Item>
      </Menu.Menu>
    );
  };

  homePage = () => {
    return (
      <React.Fragment>
        {/* <Button onClick={this.handleNewRequest}>Create a Request</Button> */}
        {/* {this.state.showNewRequestModal ? (
          <NewRequestModal
            user={this.state.user}
            logged_in={this.state.logged_in}
            getRequests={this.getRequests}
          />
        ) : null} */}

        {this.state.showSignInModal ? (
          <SignInModal
            handleClickSignIn={this.handleClickSignIn}
            handleUserState={this.props.handleUserState}
          />
        ) : null}

        <h3>Please help support your local Wichita community</h3>
        <List requests={this.props.requests} user={this.props.user} />
      </React.Fragment>
    );
  };

  render() {
    const { activeItem } = this.state;

    if (this.props.logged_in) {
      return (
        <React.Fragment>
          <Router>
            {" "}
            <Route
              name="my convos router"
              exact
              path="/myconvos"
              render={routerProps => {
                return <Messages {...routerProps} user={this.props.user} />;
              }}
            />
            <Menu>
              {this.homePageNav()}
              <Menu.Item
                name="messages"
                active={activeItem === "messages"}
                onClick={this.handleItemClick}
                as={Link}
                to="/myconvos"
              >
                Messages
              </Menu.Item>
              {/* <Route
                exact
                path="/myconvos"
                render={routerProps => {
                  return <Messages {...routerProps} user={this.props.user} />;
                }}
              /> */}
              <React.Fragment>
                <Menu.Menu position="right">
                  <Menu.Item>{this.homePageSearch()}</Menu.Item>

                  <Menu.Item
                    position="right"
                    name="Logout"
                    active={activeItem === "Logout"}
                    onClick={this.handleItemClick}
                    // onClick={this.props.signOut()}
                  ></Menu.Item>
                </Menu.Menu>
              </React.Fragment>
            </Menu>
            {this.homePage()}
          </Router>
        </React.Fragment>
      );
    } else
      return (
        <div>
          <Router>
            <nav>
              <Menu>
                {this.homePageNav()}

                <Menu.Menu position="right">
                  <Menu.Item>{this.homePageSearch()}</Menu.Item>
                  <Menu.Item
                    name="Log In"
                    active={activeItem === "Log In"}
                    onClick={this.showLogInModal}
                  ></Menu.Item>
                </Menu.Menu>
              </Menu>
            </nav>
            {this.homePage()}
          </Router>
        </div>
      );
  }
}

export default NavBar;
