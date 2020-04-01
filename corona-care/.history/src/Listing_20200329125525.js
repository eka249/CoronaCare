import React from "react";
import { List } from "semantic-ui-react";
import Router from "react-router-dom";

const Listing = props => (
  <List>
    <Router>
      <List.Item>
        {/* <List.Icon name="marker" /> */}
        <List.Content>
          <List.Header as="a">{props.request.title}</List.Header>
          <List.Description>{props.request.description}</List.Description>
        </List.Content>
      </List.Item>
    </Router>
  </List>
);

export default Listing;
