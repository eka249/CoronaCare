import React from "react";
import { List } from "semantic-ui-react";

const Listing = request => (
  <List>
    <List.Item>
      {/* <List.Icon name="marker" /> */}
      <List.Content>
        {/* <List.Header as="a">{this.props.request.title}</List.Header>
        <List.Description>{this.props.description}</List.Description> */}
        {/* {this.props.requests.title} */}
      </List.Content>
    </List.Item>
  </List>
);

export default Listing;
