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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        id: this.props.user.id
      })
    })
      .then(response => response.json())
      .then(data => this.setState({ ...this.state, convos: data }));
  };

  handleConvoClick = (e, key) => {
    console.log("e.target.id", e.target.id, "key", key);
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
          {this.props.user.conversations.map((convo, index) => {
            return (
              <Table.Row>
                <Button
                  key={index}
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
      return (
        <React.Fragment>
          {this.convoTable()}
          {/* <Feed position="right">
            {this.state.convos[this.state.activeConvo].full_conversations.map(
              message => {
                console.log(message.id);
                return <Feed.Event>{message}</Feed.Event>;
              }
            )}
          </Feed> */}
        </React.Fragment>
      );
    } else return this.convoTable();
  }
}
export default Messages;
