import React, { Component } from "react";
import { List } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import OpenRequestModal from "./OpenRequestModal";

class Listing extends Component {
  constructor() {
    super();
    this.state = {
      expandedModal: false
    };
  }

  handleOpenRequest = () => {
    {
      this.setState({
        ...this.state,
        expandedModal: !this.state.expandedModal
      });
    }
  };
  // the below list returns need to have a margin on the left side of page and more clear separations between posts

  render() {
    return (
      <div>
        <List>
          <Router>
            <List.Item>
              <List.Content>
                <List.Header onClick={this.handleOpenRequest}>
                  {this.props.request.title}
                  {/* <Link to={`/requests/${props.request.id}`}>
              {props.request.title}
            </Link> */}
                </List.Header>
                <List.Description>
                  {this.props.request.description}
                </List.Description>
              </List.Content>
            </List.Item>
          </Router>
        </List>
        {this.state.expandedModal ? (
          <OpenRequestModal
            user={this.props.user}
            request={this.props.request}
          />
        ) : null}
        )
      </div>
    );
  }
}

export default Listing;
