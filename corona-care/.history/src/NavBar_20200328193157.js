import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

// import { BrowserRouter as Router, Link } from "react-router-dom";

class NavBar extends Component {
  state = { activeItem: "home", showNewModal: false };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleNewRequest = (e, { name }) =>
    this.setState({ activeItem: name, showNewModal: !this.state.showNewModal });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            //   <Link to= '/'{name}>{name}</Link>
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Create a Request"
            active={activeItem === "Create a Request"}
            onClick={this.handleNewRequest}
          />
          <Menu.Item
            name="Messages"
            active={activeItem === "Messages"}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item
              name="Logout"
              active={activeItem === "Logout"}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
export default NavBar;
