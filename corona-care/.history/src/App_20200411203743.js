import React, { Component } from "react";
import NavBar from "./NavBar";
import List from "./List";
import SignInModal from "./SignInModal";
import { Input, Menu, Image } from "semantic-ui-react";
// import "semantic-ui-css/semantic.min.css";
import Messages from "./Messages";

class App extends Component {
  // componentDidMount() {
  //   fetch("http://localhost:3000/requests", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accepts: "application/json",
  //       Authorization: `Bearer ${localStorage.token}`
  //     }
  //   })
  //     .then(response => response.json())
  // .then(resp => console.log("response from did nmounth", resp))
  // .then(data => this.setState({ ...this.state, requests: data }))
  // .then(this.changeDataState);

  // this.getRequests();
  // }
  constructor() {
    super();

    this.state = {
      requests: null,
      logged_in: false,
      user: null,
      showMessages: false,
      showProfile: false
    };
    this.getRequests();
  }

  handleMessageState = () => {
    console.log("hit change message state in app");
    this.setState({
      ...this.state,
      showMessages: !this.state.showMessages
    });
  };
  changeDataState = data => {
    //needed an extra function because .then() was exceeding in componentDidMount
    this.setState({
      ...this.state,
      requests: data
    });
    console.log("state afterSetting it", this.state);
  };
  showLogInModal = () => {
    //after onClick of "LogIn"
    this.setState({
      ...this.state,
      showSignInModal: true
    });
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
      .then(data => this.changeDataState(data));
  };

  homePage = () => {
    return (
      <React.Fragment>
        <h3>Please help support your local Wichita community</h3>
        <List requests={this.state.requests} user={this.state.user} />
      </React.Fragment>
    );
  };

  handleUserState = response => {
    this.setState({
      ...this.state,
      logged_in: true,
      user: response.user
    });
    console.log(
      "hit handleusersteate in app",
      response,
      "response.user:",
      response.user,
      "state afterSetting it",
      this.state
    );
  };

  showMessages = () => {
    return <Messages user={this.props.user} />;
  };

  showProfile = () => {
    console.log("profile work here");
  };

  // signOut = () => {
  //   console.log("hit sign out in app");
  //   localStorage.removeItem("token");
  //   this.setState({ ...this.state, logged_in: false, user: null });
  // };

  navBar = () => {
    return (
      <NavBar
        user={this.state.user}
        requests={this.state.requests}
        logged_in={this.state.logged_in}
        changeLogInState={this.changeLogInState}
        getRequests={this.getRequests}
        handleUserState={this.handleUserState}
        signOut={this.signOut}
        handleMessageState={this.handleMessageState}
      />
    );
  };

  render() {
    // const { activeItem } = this.state;
    if (!this.state.showMessages && !this.state.showProfile) {
      return (
        <React.Fragment>
          {this.navBar()}
          {this.homePage()}
        </React.Fragment>
      );
    } else if (this.state.showMessages) {
      return (
        <React.Fragment>
          {this.navBar()}
          {this.showMessages()}
        </React.Fragment>
      );
    } else
      return (
        <React.Fragment>
          {this.navBar()}
          {this.showProfile()}
        </React.Fragment>
      );

    //     <React.Fragment>
    //       <Router>
    //         <Router></Router>
    //         <Menu>
    //           {this.homePageNav()}
    //           <Menu.Item
    //             name="messages"
    //             active={activeItem === "messages"}
    //             onClick={this.handleItemClick}
    //             as={Link}
    //             to="/myconvos"
    //           >
    //             Messages
    //           </Menu.Item>
    //           <Route
    //             exact
    //             path="/myconvos"
    //             render={routerProps => {
    //               return <Messages {...routerProps} user={this.state.user} />;
    //             }}
    //           />
    //           <React.Fragment>
    //             <Menu.Menu position="right">
    //               <Menu.Item>{this.homePageSearch()}</Menu.Item>

    //               <Menu.Item
    //                 position="right"
    //                 name="Logout"
    //                 active={activeItem === "Logout"}
    //                 onClick={this.handleItemClick}
    //                 onClick={this.signOut}
    //               ></Menu.Item>
    //             </Menu.Menu>
    //           </React.Fragment>
    //         </Menu>
    //         {this.homePage()}
    //       </Router>
    //     </React.Fragment>

    // } else
    //   return (
    // <div>
    //   <Router>
    //     <nav>
    //       <Menu>
    //         {this.homePageNav()}

    //         <Menu.Menu position="right">
    //           <Menu.Item>{this.homePageSearch()}</Menu.Item>
    //           <Menu.Item
    //             name="Log In"
    //             active={activeItem === "Log In"}
    //             onClick={this.changeLogInState}
    //           ></Menu.Item>
    //         </Menu.Menu>
    //       </Menu>
    //     </nav>
    //     {this.homePage()}
    //   </Router>
    // </div>
    // );
  }
}

export default App;