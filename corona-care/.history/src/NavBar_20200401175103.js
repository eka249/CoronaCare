import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import NewModal from "./newModal";
import { Menu } from "semantic-ui-react";

class NavBar extends Component {
  state = { activeItem: "home", showNewModal: false };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  handleNewRequest = (e, { name }) => {
    this.setState({ activeItem: name, showNewModal: true });
  };
  showModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  render() {
    const { activeItem } = this.state;
    // if (this.state.showNewModal === true) {
    //   return <NewModal />;
    // }
    //decided not to put modal as onClick in navbar; will have a constant button for prominence

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
                <Link to="/"> Home </Link>
              </Menu.Item>
              <Menu.Item
                name="Messages"
                active={activeItem === "Create a Request"}
                onClick={this.handleItemClick}
              >
                <Link to="/messages">Messages</Link>
              </Menu.Item>

              <Menu.Item
                name="Create a Request"
                active={activeItem === "Create a Request"}
                onClick={this.handleNewRequest}
              >
                <Link to="/request">Create a Request</Link>
              </Menu.Item>

              {/* <Menu.Menu>
              {" "}
              position="right">
              <Menu.Item
                name="Logout"
                active={activeItem === "Logout"}
                onClick={this.handleItemClick}
              />
            </Menu.Menu> */}
            </Menu>
          </nav>
        </Router>
      </div>
    );
  }
}

export default NavBar;
