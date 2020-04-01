import React from "react";
import { List } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Listing = props => (
  <List>
    <Router>
      <List.Item>
        {/* <List.Icon name="marker" /> */}
        <List.Content>
          <List.Header>
            {props.request.title}
            <Link to="/requests${propbs.request.title.index}"> Home </Link>
          </List.Header>
          <List.Description>{props.request.description}</List.Description>
        </List.Content>
      </List.Item>
    </Router>
  </List>
);

export default Listing;
