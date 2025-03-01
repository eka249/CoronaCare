import React, { Component } from "react";
import {
  Icon,
  Table,
  Feed,
  Button,
  Grid,
  Segment,
  Divider,
  Form
} from "semantic-ui-react";

class Messages extends Component {
  // componentDidMount() {
  //   this.fetchConvos();
  // }

  constructor(props) {
    super(props);
    this.fetchConvos();
    this.state = {
      activeConvo: null,
      convos: null,
      filteredConvos: null,
      messages: null,
      response: null
    };
  }

  fetchConvos = () => {
    console.log("hit fetchConvos");
    fetch(`http://localhost:3000/convos/${this.props.user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ ...this.state, convos: data }));
  };

  handleRespond = () => {
    fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        user_id: this.props.user.id,
        convo_id: this.state.activeConvo,
        messagetext: this.state.response
      })
    })
      .then(resp => resp.json())
      .then(this.fetchConvos())
      .then(this.handleConvoClick());
  };

  handleChange = e => this.setState({ response: e.target.value });

  handleSetActiveConvo = e => {
    this.setState(
      { ...this.state, activeConvo: e.target.id },
      this.handleConvoClick
    );
  };

  handleConvoClick = () => {
    //function necessary to make sure state is set before filtering
    let theConvos = this.state.convos.filter(
      convo => convo.id == this.state.activeConvo
    );
    this.setState(
      {
        ...this.state,
        messages: theConvos[0].messages
      },
      () => this.convoDisplay()
    );
  };

  convoDisplay = () => {
    if (this.state.messages) {
      console.log(
        "state of messages beginning convoDisplay function",
        this.state.messages
      );
      return (
        <React.Fragment>
          <Feed>
            {this.state.messages.map((message, index) => {
              return (
                <Feed.Event key={index}>
                  message text from {message.user_id}: {message.messagetext}
                </Feed.Event>
              );
            })}
          </Feed>
          <Form>
            <Form.Field onChange={this.handleChange}>
              <label>Enter Your Response Here:</label>
              <input placeholder="Nice to virtually meet you as well!" />
            </Form.Field>
            <Button onClick={this.handleRespond}>Send</Button>
          </Form>
        </React.Fragment>
      );
    }
  };

  convoTable = () => {
    if (this.state.convos) {
      return (
        <Table celled position="left">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Conversations</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.convos.map((convo, index) => {
              return (
                <Table.Row>
                  <Button
                    key={index}
                    id={convo.id}
                    messages={convo.messages}
                    onClick={this.handleSetActiveConvo}
                  >
                    {" "}
                    conversation fromID:
                    {convo.fromID}
                  </Button>
                  {/* add conditional ribbons if unread later; see semantic ui
              documentation */}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      );
    }
    return <div>No Messages!</div>;
  };

  render() {
    if (this.state.activeConvo) {
      return (
        <Segment>
          <Grid
            columns={2}
            // relaxed="very"
          >
            <Grid.Column>{this.convoTable()}</Grid.Column>

            <Grid.Column>{this.convoDisplay()}</Grid.Column>
          </Grid>
          <Divider vertical>
            <Icon name="heartbeat"></Icon>
          </Divider>
        </Segment>
      );
    } else return this.convoTable();
  }
}
export default Messages;
