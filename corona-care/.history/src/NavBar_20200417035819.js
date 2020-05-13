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
      showNewRequestModal: false,
      showSignInModal: false
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

  handleRedirectHome = () => {
    this.props.redirectHome("home");
    // this.setState({ activeItem: name });
  };
  handleRedirectMessages = () => {
    this.props.redirectMessages("myconvos");
    // this.setState({ activeItem: name });
  };
  //   handleRedirectProfile = () => {
  //     this.props.handleRedirect("myprofile");
  //     // this.setState({ activeItem: name });
  //   };

  handleLinkHome = e => {
    this.props.redirectHome(e.target.name);
  };

  triggerGetRequests = () => {
    this.props.getRequests();
  };

  homePageNav = () => {
    return (
      <React.Fragment>
        <div>
          <Link to="/">
            <Image
              name="home"
              onClick={this.handleLinkHome}
              size="small"
              //   src="https://assets.simpleviewinc.com/simpleview/image/upload/crm/wichita/Keeper-CRM0-90eba9295056a36_90ebab7f-5056-a36a-07ed42e3ea553a4a.jpg"
              src="https://cdn.pixabay.com/photo/2019/10/22/13/23/keeper-of-the-plains-4568727_960_720.jpg"
              fluid
            ></Image>
          </Link>

          <Menu.Item
            name="home"
            onClick={this.handleRedirectHome}
            as={Link}
            to="/"
          >
            CoronaCare
          </Menu.Item>
        </div>
        <Menu.Item onClick={this.handleItemClick}>
          <NewRequestModal
            user={this.props.user}
            logged_in={this.props.logged_in}
            getRequests={this.props.getRequests}
            showLogInModal={this.showLogInModal}
            // triggerGetRequests=
          />
        </Menu.Item>
      </React.Fragment>
    );
  };

  navBarMessages = () => {
    const { activeItem } = this.state;

    return (
      <React.Fragment>
        <Menu.Item
          name="messages"
          active={activeItem === "messages"}
          onClick={this.handleRedirectMessages}
          as={Link}
          to="/myconvos"
        >
          Messages
        </Menu.Item>
        {/* <Switch>
          <Route
            exact
            path="/myconvos"
            render={routerProps => {
              return <Messages {...routerProps} user={this.props.user} />;
            }}
          ></Route>
        </Switch> */}
      </React.Fragment>
    );
  };

  navLogOut = () => {
    const { activeItem } = this.state;

    return (
      <Menu.Menu position="right">
        <Menu.Item
          position="right"
          active={activeItem === "Logout"}
          onClick={this.handleItemClick}
          onClick={this.props.signOut}
        >
          Log Out
        </Menu.Item>
      </Menu.Menu>
    );
  };
  navLogIn = () => {
    const { activeItem } = this.state;

    return (
      <Menu.Item
        name="Log In"
        active={activeItem === "Log In"}
        onClick={this.showLogInModal}
      ></Menu.Item>
    );
  };

  render() {
    const { activeItem } = this.state;
    if (this.state.showSignInModal) {
      return (
        <SignInModal
          handleClickSignIn={this.handleClickSignIn}
          handleUserState={this.handleUserState}
        />
      );
    }

    if (this.props.logged_in) {
      return (
        <React.Fragment>
          <Menu>
            {this.homePageNav()}
            {/* <NavSearch user= {this.props.user} requests={this.props.requests}/> */}
            {/* {this.navBarProfile()} */}
            {/* {this.navSearch()} */}
            {this.navBarMessages()}
            {this.navLogOut()}
          </Menu>
          {/* {this.homePage()} */}
          {/* <Switch>
            <Route
              exact
              path="/messages"
              render={routerProps => {
                return <Messages {...routerProps} user={this.props.user} />;
              }}
            />
          </Switch> */}
        </React.Fragment>
      );
    } else
      return (
        <div>
          <Router>
            <nav>
              <Menu>
                {this.homePageNav()}
                {/* {this.navSearch()} */}
                {this.navLogIn()}
              </Menu>
            </nav>
            {/* {this.homePage()} */}
          </Router>
        </div>
      );
  }
}

export default NavBar;
