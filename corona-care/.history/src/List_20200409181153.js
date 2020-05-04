import React, { Component } from "react";
import Listing from "./Listing";

class List extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        {/* {this.props.requests.map((request, index) => {
          return (
            <Listing key={index} request={request} user={this.props.user} />
          );
        })} */}
      </div>
    );
  }
}
export default List;
