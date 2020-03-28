// import React from "react";
// import { List } from "semantic-ui-react";

// const Listing = () => (
//   <List link>
//     <List.Item active>{this.props.request}</List.Item>
//   </List>
// );

// export default Listing;

import React from "react";
import { List } from "semantic-ui-react";

const Listing = () => (
  <List>
    <List.Item>
      {/* <List.Icon name="marker" /> */}
      <List.Content>
        <List.Header as="a">{title}</List.Header>
        <List.Description>{description}</List.Description>
      </List.Content>
    </List.Item>
  </List>
);

export default Listing;
