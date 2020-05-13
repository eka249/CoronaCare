import React, { Component } from "react";
import { Icon, Label, Menu, Table, Feed, Button } from "semantic-ui-react";
import { BrowserRouter as Router, Route } from "react-router-dom";

class Messages extends Component {
  componentDidMount() {
    this.fetchConvos();
  }

  state = {
    activeConvo: null,
    convos: null
  };
  fetchConvos = () => {
    fetch(`http://localhost:3000/myconvos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(response => response.json())
      .then(data => console.log("convo data", data));
    // .then(data => this.setState({ ...this.state, convos: data }))
    // .then(console.log(this.state.convos));
  };

  handleConvoClick = e => {
    console.log("e.target.id", e.target.id);
    this.setState({ activeConvo: e.target.id });
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
          {this.props.user.conversations.map((convo, key) => {
            return (
              <Table.Row>
                <Button
                  key={key}
                  id={convo.id}
                  messages={convo.messages}
                  onClick={this.handleConvoClick}
                >
                  {convo.id}
                </Button>
                {/* add conditional ribbons if unread later; see semantic ui
              documentation */}
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
      return (
        <React.Fragment>
          {this.convoTable()}
          {/* <Feed position="right">
            {this.state.convos[this.state.activeConvo].messages.map(message => {
              console.log(convo.id);
              return <Feed.Event></Feed.Event>;
            })}
          </Feed> */}
        </React.Fragment>
      );
    } else return this.convoTable();
  }
}
export default Messages;
