import React, { Component, Button } from "react";
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
import { Input, Menu, Image } from "semantic-ui-react";

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
    this.setState({
      ...this.state,
      showSignInModal: !this.state.showSignInModal
    });
  };

  handleNewRequest = e => {
    this.setState({ showNewRequestModal: !this.state.showNewRequestModal });
  };

  handleClickSignIn = response => {
    this.setState({
      ...this.state,
      showSignInModal: !this.state.showSignInModal,
      logged_in: true,
      user: response.user
    });
  };
  // fetch("http://localhost:3000/user/profile",{
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accepts: "application/json",
  //     Authorization: `Bearer ${localStorage.token}`
  //   },

  // })
  // .then(response=>response.json())

  signOut = () => {
    localStorage.removeItem("token");
    this.setState({ ...this.state, logged_in: false, user: null });
  };

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
            user={this.state.user}
            logged_in={this.state.logged_in}
            getRequests={this.getRequests}
            changeLogInState={this.changeLogInState}
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
          <SignInModal handleClickSignIn={this.handleClickSignIn} />
        ) : null}

        <h3>Please help support your local Wichita community</h3>
        <List requests={this.state.requests} user={this.state.user} />
      </React.Fragment>
    );
  };
  <Switch>
      <Route
        exact
        path="/myconvos"
        render={() => {
          return <Messages user={this.state.user} />;
        }}
      />
      <Route exact path="/" component={App} />
    </Switch>;
  render() {
    const { activeItem } = this.state;

    //  return (this.homePageNav()
    //   this.homePage())
  

    if (this.state.logged_in) {
      return (
        <React.Fragment>
          <React.Fragment>
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
                    Messages
                  </Menu.Item>
                </React.Fragment>

                {/* <Messages user={this.state.user} /> */}

                <React.Fragment>
                  <Menu.Menu position="right">
                    <Menu.Item>{this.homePageSearch()}</Menu.Item>

                    <Menu.Item
                      position="right"
                      name="Logout"
                      active={activeItem === "Logout"}
                      onClick={this.handleItemClick}
                      onClick={this.signOut}
                    ></Menu.Item>
                  </Menu.Menu>
                </React.Fragment>
              </Menu>

              <Route exact path="/myconvos">
                {/* <Messages user={this.state.user} /> */}
              </Route>
              {this.homePage()}
              <Route exact path="/myconvos" component={Messages}></Route>
            </Router>
          </React.Fragment>
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
                    onClick={this.changeLogInState}
                  ></Menu.Item>
                </Menu.Menu>
              </Menu>
            </nav>
            {this.homePage()}
          </Router>
        </div>
      );

    // return (<Route exact path="/myconvos" component={Messages}></Route>)
  }
}

export default App;
