import React, { Component } from "react";
import { Icon, Label, Menu, Table, Feed, Button } from "semantic-ui-react";

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
  theMessages = () => {
    var theMessages = this.state.convos.filter(
      convo => convo.id == this.state.activeConvo
    );
    console.log(
      "themessages[0]",
      theMessages[0].full_conversation[23][0].messagetext
    );

    return theMessages[0].full_conversation;
  };
  render() {
    if (this.state.activeConvo != null) {
      let theMessages = this.state.convos.filter(
        convo => convo.id == this.state.activeConvo
      );
      var theMessage = theMessages[0];
      // console.log("this.state.convos", this.state.convos);
      // console.log("this.state.activeconvo", this.state.activeConvo);
      console.log("theMessage", theMessages[0]);

      return (
        <React.Fragment>
          {this.convoTable()}
          {/* {this.theMessages()} */}
          {/* <Feed position="right">
            {theMessage.map(message =>
              // {
              //   message.map(item => (
              //     <Feed.Event>{item.messagetext}</Feed.Event>
              //   ));
              // }
              console.log("message", message)
            )}
            )}
          </Feed> */}
        </React.Fragment>
      );
    } else return this.convoTable();
  }
}
export default Messages;