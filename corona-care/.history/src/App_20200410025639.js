import React, { Component } from "react";
import NavBar from "./NavBar";

// import "semantic-ui-css/semantic.min.css";

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
  //     // .then(resp => console.log("response from did nmounth", resp))
  //     // .then(data => this.setState({ ...this.state, requests: data }))
  //     .then(this.changeDataState);

  //   // this.getRequests();
  // }
  constructor() {
    super();
    this.getRequests();
    this.state = {
      requests: null,
      logged_in: false,
      user: null
    };
  }

  // changeDataState = data => {
  //   //needed an extra function because .then() was exceeding in componentDidMount
  //   this.setState({
  //     ...this.state,
  //     requests: data
  //   });
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
      .then(data => this.setState({ requests: data }));
  };

  // ,
  // activeItem: "home",
  // showNewModal: false,
  // showSignInModal: false,
  // showNewRequestModal: false

  // handleItemClick = (e, { name }) => {
  //   this.setState({ activeItem: name });
  // };

  // changeLogInState = () => {
  //   this.setState({
  //     ...this.state,
  //     showSignInModal: !this.state.showSignInModal
  //   });
  // };

  // handleNewRequest = e => {
  //   this.setState({ showNewRequestModal: !this.state.showNewRequestModal });
  // };

  handleUserState = response => {
    console.log(
      "hit handleusersteate in app",
      response,
      "response.user:",
      response.user
    );

    this.setState({
      ...this.state,
      logged_in: true,
      user: response.user
    });
  };

  signOut = () => {
    localStorage.removeItem("token");
    this.setState({ ...this.state, logged_in: false, user: null });
  };

  // homePageNav = () => {
  //   return (
  //     <NavBar
  //       user={this.state.user}
  //       requests={this.state.requests}
  //       logged_in={this.state.logged_in}
  //       changeLogInState={this.changeLogInState}
  //       getRequests={this.getRequests}
  //       handleUserState={this.handleUserState}
  //       signOut={this.signOut}
  //     />
  //   );
  // };
  //     <React.Fragment>
  //       <div>
  //         <Link to="/">
  //           <Image
  //             size="small"
  //             src="https://assets.simpleviewinc.com/simpleview/image/upload/crm/wichita/Keeper-CRM0-90eba9295056a36_90ebab7f-5056-a36a-07ed42e3ea553a4a.jpg"
  //             fluid
  //           ></Image>
  //         </Link>

  //         <Menu.Item
  //           name="home"
  //           // active={activeItem === "home"}
  //           onClick={this.handleItemClick}
  //         >
  //           <Link to="/"> CoronaCare</Link>
  //         </Menu.Item>
  //       </div>
  //       <Menu.Item onClick={this.handleItemClick}>
  //         <NewRequestModal
  //           user={this.state.user}
  //           logged_in={this.state.logged_in}
  //           getRequests={this.getRequests}
  //           changeLogInState={this.changeLogInState}
  //         />
  //       </Menu.Item>
  //     </React.Fragment>
  //   );
  // };
  // homePageSearch = () => {
  //   return (
  //     <Menu.Menu>
  //       <Menu.Item fixed="right">
  //         <Input icon="search" placeholder="Search Titles or Descriptions" />
  //       </Menu.Item>
  //     </Menu.Menu>
  //   );
  // };

  // homePage = () => {
  //   return (
  //     <React.Fragment>
  //       {/* <Button onClick={this.handleNewRequest}>Create a Request</Button> */}
  //       {/* {this.state.showNewRequestModal ? (
  //         <NewRequestModal
  //           user={this.state.user}
  //           logged_in={this.state.logged_in}
  //           getRequests={this.getRequests}
  //         />
  //       ) : null} */}

  //       {this.state.showSignInModal ? (
  //         <SignInModal handleClickSignIn={this.handleClickSignIn} />
  //       ) : null}

  //       <h3>Please help support your local Wichita community</h3>
  //       <List requests={this.state.requests} user={this.state.user} />
  //     </React.Fragment>
  //   );
  // };

  render() {
    // const { activeItem } = this.state;

    // if (this.state.logged_in) {
    return (
      <NavBar
        user={this.state.user}
        requests={this.state.requests}
        logged_in={this.state.logged_in}
        changeLogInState={this.changeLogInState}
        getRequests={this.getRequests}
        handleUserState={this.handleUserState}
        signOut={this.signOut}
      />
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
