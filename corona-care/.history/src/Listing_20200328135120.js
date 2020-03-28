import React from "react";
import { List } from "semantic-ui-react";

const Listing = () => (
  <List link>
    <List.Item active>{this.props.request}</List.Item>
  </List>
);

export default Listing;
