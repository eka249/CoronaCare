import React from "react";
import { List } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Listing = props => (
  // the below list returns need to have a margin on the left side of page and more clear separations between posts
  <List>
    <Router>
      <List.Item>
        <List.Content>
          <List.Header>
            <Link to={`/requests/${props.request.id}`}>
              {props.request.title}
            </Link>
          </List.Header>
          <List.Description>{props.request.description}</List.Description>
        </List.Content>
      </List.Item>
    </Router>
  </List>
);

export default Listing;
