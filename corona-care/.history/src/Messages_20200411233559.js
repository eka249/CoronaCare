import React, { Component } from "react";
import { Icon, Label, Menu, Table, Feed } from "semantic-ui-react";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Messages extends Component {
  componentDidMount() {
    this.fetchConvos();

    
    };

    state = {
      activeConvo: null
    }
    fetchConvos = () => {
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
    };
  }

  handleConvoClick = id => {
    console.log("id", id);
    this.setState({ activeConvo: id });
    console.log("current active convo state:", this.state.activeConvo);
  };

  convoTable = () => {
    return (
      <Table celled position="left">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Conversations</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.user.conversations.map(convo => {
            return (
              <Table.Row
                // onClick={this.handleConvoClick(convo.id)}
                id={convo.id}
              >
                {/* add conditional ribbons if unread later; see semantic ui
              documentation */}
                {convo.id}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  };

  render() {
    if (this.state.activeConvo != null) {
      // console.log(
      //   "conversations[this.state.activeConvo]",
      //   this.props.conversations[this.state.activeConvo]
      // );
      console.log("this.state.activeConvo]", this.state.activeConvo);
      return (
        <React.Fragment>
          {this.convoTable()}
          {/* <Feed position="right">
            {this.props.user.conversations[this.state.activeConvo].messages.map(
              message => {
                // console.log(convo.id);
                return (
                  <Feed.Event> */}
          {/* <Table.Cell onClick = {this.handleConvoClick} id = {convo.id}>
            {/* add conditional ribbons if unread later; see semantic ui
            documentation */}
          {/* {message.id} */}
          {/* </Table.Cell> */}
          {/* </Feed.Event>
                );
              }
            )}
          </Feed> */}
        </React.Fragment>
      );
    } else return this.convoTable();
  }
}
export default Messages;
