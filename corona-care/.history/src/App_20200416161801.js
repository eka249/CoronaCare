import React, { Component } from "react";
import NavBar from "./NavBar";
import List from "./List";
import SignInModal from "./SignInModal";
import { Input, Menu, Image } from "semantic-ui-react";
// import "semantic-ui-css/semantic.min.css";
import Messages from "./Messages";

class App extends Component {
  constructor() {
    super();

    this.state = {
      allRequests: null,
      logged_in: false,
      user: null,
      myconvos: false,
      myprofile: false,
      home: true,
      filteredRequests: null,
      searchInput: null
    };
    this.getRequests();
  }

  redirectHome = () => {
    this.setState({
      ...this.state,
      home: true,
      myconvos: false,
      myprofile: false
    });
  };
  redirectMessages = () => {
    this.setState({
      ...this.state,
      home: false,
      myconvos: true,
      myprofile: false
    });
  };
  changeDataState = data => {
    //needed an extra function because .then() was exceeding in componentDidMount
    this.setState({
      ...this.state,
      allRequests: data
    });
  };
  showLogInModal = () => {
    //after onClick of "LogIn"
    this.setState({
      ...this.state,
      showSignInModal: true
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  searchNav = () => {
    return (
      <Menu.Menu position="right">
        <Menu.Item fixed="right">
          <Input
            name="searchInput"
            icon="search"
            placeholder="Search Titles or Descriptions"
            onChange={this.handleChange}
          />
        </Menu.Item>
      </Menu.Menu>
    );
  };
  ///////////
  filteredRequests = () => {
    if (this.state.searchInput === null) {
      return this.props.unfilteredTaskList.map((task, index) => {
        return (
          <div>
            <TaskDetails
              key={index}
              myTask={task}
              handleFetchAllTasks={this.props.handleFetchAllTasks}
              employees={this.props.employees}
            />
          </div>
        );
      });
    } else {
      let filteredList = this.props.unfilteredTaskList.filter(task => {
        let searched = this.state.searchTask;
        let titles = task.title
          .split(" ")
          .filter(word => word.toLowerCase().match(searched));
        let clients = task.client
          .split(" ")
          .filter(word => word.toLowerCase().match(searched));
        let descWords = task.description
          .split(" ")
          .filter(word => word.toLowerCase().match(searched));
        return titles.length > 0 || descWords.length > 0 || clients.length > 0;
      });
      if (filteredList.length > 0) {
        return filteredList.map((task, index) => {
          return (
            <div>
              <TaskDetails
                key={index}
                myTask={task}
                employees={this.props.employees}
                handleFetchAllTasks={this.props.handleFetchAllTasks}
              />
            </div>
          );
        });
      } else {
        return null;
      }
    }
  };
  ////////////////////////

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
        <List requests={this.state.filteredRequests} user={this.state.user} />
      </React.Fragment>
    );
  };

  handleUserState = response => {
    this.setState({
      ...this.state,
      logged_in: true,
      user: response.user
    });
    // console.log(
    //   "this.state.user.convos in app through user",
    //   this.state.user.conversations
    // );
    // console.log(
    //   "hit handleusersteate in app",
    //   response,
    //   "response.user:",
    //   response.user,
    //   "state afterSetting it",
    //   this.state
    // );
  };

  showMessages = () => {
    return <Messages user={this.state.user} />;
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
        requests={this.state.filteredRequests}
        logged_in={this.state.logged_in}
        changeLogInState={this.changeLogInState}
        getRequests={this.getRequests}
        handleUserState={this.handleUserState}
        signOut={this.signOut}
        redirectHome={this.redirectHome}
        redirectMessages={this.redirectMessages}
      />
    );
  };

  render() {
    // const { activeItem } = this.state;
    if (!this.state.myconvos && !this.state.myprofile) {
      return (
        <React.Fragment>
          {this.navBar()}
          {this.filteredRequests()}
          {this.homePage()}
        </React.Fragment>
      );
    } else if (this.state.myconvos) {
      return (
        <React.Fragment>
          {this.navBar()}
          {this.filteredRequests()}
          {this.showMessages()}
        </React.Fragment>
      );
    } else
      return (
        <React.Fragment>
          {this.navBar()}
          {this.filteredRequests()}
          {this.showProfile()}
        </React.Fragment>
      );
  }
}

export default App;
