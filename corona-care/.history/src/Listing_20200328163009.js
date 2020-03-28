import React from "react";
import { List } from "semantic-ui-react";

const Listing = props => (
  <List>
    <List.Item>
      {/* <List.Icon name="marker" /> */}
      <List.Content>
        <List.Header as="a">{props.request.title}</List.Header>
        <List.Description>{props.request.description}</List.Description>
      </List.Content>
    </List.Item>
  </List>
);

export default Listing;
