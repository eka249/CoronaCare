import React, { Component } from "react";
import List from "./List";
import NewRequestModal from "./NewRequestModal";
import SignInModal from "./SignInModal";

// import NavBar from "./NavBar";
import Messages from "./Messages";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import { Input, Menu } from "semantic-ui-react";

// import "semantic-ui-css/semantic.min.css";

class App extends Component {
  constructor() {
    super();
    this.getRequests();
    this.state = {
      requests: [],
      logged_in: false,
      user: null,
      activeItem: "home",
      showNewModal: false,
      showSignInModal: false,
      showNewRequestModal: false,
      username: "",
      password: "",
      activeItem: "home"
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
    this.getLoggedIn(response);
    {
      this.setState({
        ...this.state,
        showSignInModal: !this.state.showSignInModal
      });
    }
  };

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

  homePageNav = () => {
    <React.Fragment>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={this.handleItemClick}
      >
        <Link to="/"> CoronaCare</Link>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
      </Menu.Menu>
    </React.Fragment>;
  };

  homePage = () => {
    return (
      <div>
        {this.state.showNewRequestModal ? (
          <NewRequestModal user={this.state.user} />
        ) : null}

        {this.state.showSignInModal ? (
          <SignInModal handleClickSignIn={this.handleClickSignIn} />
        ) : null}
      </div>
    );
  };

  render() {
    const { activeItem } = this.state;
    this.homePage();
    this.homePageNav();
    return this.state.logged_in ? (
      <Router>
        <Menu>
          <React.Fragment>
            {/* <Menu.Item
                  name="home"
                  active={activeItem === "home"}
                  onClick={this.handleItemClick}
                >
                  <Link to="/"> CoronaCare</Link>
                </Menu.Item> */}
            <Menu.Item
              name="messages"
              active={activeItem === "messages"}
              onClick={this.handleItemClick}
              as={Link}
              to="/myconvos"
            >
              <Messages user={this.state.user} />
              Messages
            </Menu.Item>
          </React.Fragment>

          <React.Fragment>
            <Menu.Item
              name="Logout"
              active={activeItem === "Logout"}
              onClick={this.handleItemClick}
              // onClick={this.signOut}
            ></Menu.Item>
          </React.Fragment>
        </Menu>

        <React.Fragment>
          <Route exact path="/myconvos">
            {/* <Messages user={this.state.user} /> */}
          </Route>
        </React.Fragment>
        {/* <NewRequestModal
              user={this.state.user}
              logged_in={this.state.logged_in}
              getRequests={this.getRequests}
            /> */}
        {/* <h2>Please help support your local Wichita community.</h2>
            <List requests={this.state.requests} user={this.state.user} /> */}
      </Router>
    ) : (
      <div>
        <nav>
          <Menu>
            {/* <Menu.Item>CoronaCare</Menu.Item> */}
            <Menu.Menu position="right">
              <Menu.Item
                name="Log In"
                active={activeItem === "Log In"}
                onClick={this.changeLogInState}
              ></Menu.Item>
            </Menu.Menu>
          </Menu>
        </nav>
        {/* <NewRequestModal
            user={this.state.user}
            logged_in={this.state.logged_in}
            getRequests={this.getRequests}
          />
          <h2>Please help support your local Wichita community.</h2>
          <List requests={this.state.requests} user={this.state.user} /> */}
        {/* {this.state.showSignInModal ? (
            <SignInModal handleClickSignIn={this.handleClickSignIn} />
          ) : null} */}
      </div>
    );

    //     return(
    //       <div>
    //    <NewRequestModal
    //     user={this.state.user}
    //     logged_in={this.state.logged_in}
    //     getRequests={this.getRequests}
    //   />
    // <h2>Please help support your local Wichita community.</h2>
    // <List requests={this.state.requests} user={this.state.user} />
    //   {this.state.showSignInModal ? (
    //     <SignInModal handleClickSignIn={this.handleClickSignIn} />
    //   ) : null}
    //   </div>
    //     )
  }
}

export default App;