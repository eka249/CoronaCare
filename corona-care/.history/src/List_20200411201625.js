import React, { Component } from "react";
import Listing from "./Listing";

class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("props");
    if (this.props.requests != null) {
      return (
        <div>
          {this.props.requests.map((request, index) => {
            return (
              <Listing key={index} request={request} user={this.props.user} />
            );
          })}
        </div>
      );
    } else return null;
  }
}
export default List;
