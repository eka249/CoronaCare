import React, { Component } from "react";
import Listing from "./Listing";

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: this.props
    };
  }

  render() {
    return (
      <div>
        {this.state.requests.map((request, index) => {
          return <Listing key={index} request={request} />;
        })}
      </div>
    );
  }
}
export default List;
