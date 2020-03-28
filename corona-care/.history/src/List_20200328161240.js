import React, { Component } from "react";
import Listing from "./Listing";

class List extends Component {
  constructor() {
    super();
    this.onStart();
    this.state = {
      requests: []
    };
  }

  //   componentDidMount() {
  onStart = () => {
    fetch("http://localhost:3000/requests", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(response => response.json())
      .then(response => console.log({ response }))
      .then(data =>
        this.setState({
          requests: data
        })
      );
  };
  render() {
    return (
      <div>
        {/* {this.state.requests.map(request => (
          <Listing request={request} />
        ))} */}
      </div>
    );
  }
}
export default List;
