import React, { Component } from "react";
import { Icon, Label, Menu, Table, Feed } from "semantic-ui-react";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Messages extends Component {
  componentDidMount() {
    fetch("http:localhost/myconvos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(response => response.json())
      // .then(console.log("user", this.props.user.convos));
      .then(data => console.log(data));
  }

  render() {
    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Conversations</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.user.conversations.map(convo => {
              return (
                <Table.Row>
                  <Table.Cell>
                    {/* add conditional ribbons if unread later; see semantic ui
                    documentation */}
                    {/* <Label>{convo.fromID.first_name}</Label> */}
                    {convo.fromID}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }

  //             /* if (conversation ID is active, render feed on the right) */
}
export default Messages;
