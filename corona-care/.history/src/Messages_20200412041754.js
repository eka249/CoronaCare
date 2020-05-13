import React, { Component } from "react";
import {
  Icon,
  Label,
  Menu,
  Table,
  Feed,
  Button,
  Grid,
  Segment,
  Divider
} from "semantic-ui-react";

class Messages extends Component {
  constructor() {
    super()
    this.fetchConvos();
    
      state = {
        activeConvo: null,
        convos: null
      }
    }
  }

  
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

  handleConvoClick = e => {
    console.log("e.target.id", e.target.id);
    this.setState({ ...this.state, activeConvo: e.target.id });
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
      let theMessages = this.state.convos.filter(
        convo => convo.id == this.state.activeConvo
      );
      var theMessage = theMessages[0].full_conversation[0];
      // console.log(
      //   "theMessagetext",
      //   theMessages[0].full_conversation[0][0].messagetext,
      //   "thessage",
      //   "theMessagetext",
      //   theMessages[0].full_conversation
      // );

      return (
        <Segment>
          <Grid
            columns={2}
            // relaxed="very"
          >
            <Grid.Column>{this.convoTable()}</Grid.Column>
            <Grid.Column>
              <Feed position="right">
                {theMessage.map(message => (
                  // console.log("message", message.messagetext)
                  <Feed.Event>{message.messagetext}</Feed.Event>
                ))}
              </Feed>
            </Grid.Column>
          </Grid>
          <Divider vertical></Divider>
        </Segment>
      );
    } else return this.convoTable();
  }
}
export default Messages;
