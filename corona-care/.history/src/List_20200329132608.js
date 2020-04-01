import React, { Component } from "react";
import Listing from "./Listing";

class List extends Component {
  constructor() {
    super();
    this.getRequests();
    this.state = {
      requests: []
    };
  }

  getRequests() {
    // onStart = () => {
    fetch("http://localhost:3000/requests", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({
          requests: data
        })
      );
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
