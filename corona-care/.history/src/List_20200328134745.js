import React, { Component } from "react";

class List extends Component {
  constructor() {
    super();
    this.setState({
      requests: []
    });
  }

  componentDidMount() {
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
        {this.state.requests.map(request => (
          <Listing request={request} />
        ))}
      </div>
    );
  }
}
export default List;
