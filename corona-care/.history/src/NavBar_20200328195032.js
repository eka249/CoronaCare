import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Menu } from "semantic-ui-react";

class NavBar extends Component {
  state = { activeItem: "home", showNewModal: false };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleNewRequest = (e, { name }) =>
    this.setState({ activeItem: name, showNewModal: !this.state.showNewModal });

  render() {
    const { activeItem } = this.state;

    return (
      <nav>
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
      </nav>
    );
  }
}
export default NavBar;
