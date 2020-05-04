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
    return (
      <div>
        <Image src="https://assets.simpleviewinc.com/simpleview/image/upload/crm/wichita/Keeper-CRM0-90eba9295056a36_90ebab7f-5056-a36a-07ed42e3ea553a4a.jpg"></Image>
        <Menu.Item
          name="home"
          // active={activeItem === "home"}
          onClick={this.handleItemClick}
        >
          <Link to="/"> CoronaCare</Link>
        </Menu.Item>
      </div>
    );
  };
  homePageSearch = () => {
    return (
      <Menu.Menu>
        <Menu.Item position="right">
          <Input icon="search" placeholder="Search Titles or Descriptions" />
        </Menu.Item>
      </Menu.Menu>
    );
  };

  homePage = () => {
    return (
      <div>
        {this.state.showNewRequestModal ? (
          <NewRequestModal
            user={this.state.user}
            logged_in={this.state.logged_in}
            getRequests={this.getRequests}
          />
        ) : null}

        {this.state.showSignInModal ? (
          <SignInModal handleClickSignIn={this.handleClickSignIn} />
        ) : null}

        <h2>Please help support your local Wichita community.</h2>
        <List requests={this.state.requests} user={this.state.user} />
      </div>
    );
  };

  render() {
    const { activeItem } = this.state;

    //  return (this.homePageNav()
    //   this.homePage())

    return this.state.logged_in ? (
      <div>
        <Router>
          <Menu>
            <React.Fragment>
              {this.homePageNav()}
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
              {this.homePageSearch()}
            </React.Fragment>

            <React.Fragment>
              <Menu.Item
                position="right"
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
        </Router>
        {this.homePage()}
      </div>
    ) : (
      <div>
        <Router>
          <nav>
            <Menu>
              {/* <Menu.Item
          name="home"
          // active={activeItem === "home"}
          onClick={this.handleItemClick}
        >
          <Link to="/"> CoronaCare</Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item> */}
              {this.homePageNav()}
              {this.homePageSearch()}
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
        </Router>
        {this.homePage()}
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
