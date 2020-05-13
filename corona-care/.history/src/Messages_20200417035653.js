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
    this.state = {
      activeConvoID: null,
      convos: null,
      filteredConvos: null,
      messages: null,
      responseInput: "",
      activeConversation: null
    };
    this.fetchConvos();
  }

  fetchConvos = () => {
    //on load, fetch conversations from db for this user
    //set convos state as all conversations
    //if being fetched after a response is provided, send to handleConvoClick()
    fetch(`http://localhost:3000/convos/${this.props.user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(response => response.json())
      .then(data =>
        this.setState(
          { ...this.state, convos: data },
          this.state.activeConvoID ? () => this.handleConvoClick() : null
        )
      );
  };

  handleChange = e => {
    this.setState({ ...this.state, responseInput: e.target.value });
  };
  //handle state when user is typing response message

  handleRespond = () => {
    this.setState({ ...this.state, responseInput: "" });
    //if a message is sent, add it to the message model
    //fetch the conversations again so new message is availble for user
    //send to handleConvoClick so the filter can
    fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        user_id: this.props.user.id,
        convo_id: this.state.activeConvoID,
        messagetext: this.state.responseInput
      })
    })
      .then(resp => resp.json())

      .then(this.fetchConvos());
  };

  handleSetActiveConvoID = e => {
    //if a conversation is clicked, make it active so the corresponding
    //messages can appear in feed
    //send to handleConvoClick which will filter through all converstions to find active
    this.setState({ activeConvoID: e.target.id }, () =>
      this.handleConvoClick()
    );
  };

  handleConvoClick = () => {
    //sets the state for activeConversation (conversation that user clicked on from all)
    //sends activeConversation to messagesDisplay function
    this.setState(
      {
        ...this.state,
        // activeConversation: test
        activeConversation: this.state.convos.filter(
          convo => convo.id == this.state.activeConvoID
        )
      },
      () => this.messagesDisplay()
    );
  };

  messagesDisplay = () => {
    //if the activeConversation state has been set succesfully,
    //return the mapping of the corresponding messages in a feed
    if (this.state.activeConversation) {
      return (
        <React.Fragment>
          <Feed>
            {this.state.activeConversation[0].messages.map((message, index) => {
              return (
                <Feed.Event key={index}>
                  message text from {message.user_id}: {message.messagetext}
                </Feed.Event>
              );
            })}
          </Feed>
          <Form onSubmit={this.handleRespond}>
            <Form.Input
              value={this.state.responseInput}
              onChange={this.handleChange}
              name="responseInput"
              label="Enter Your Response Here:"
              placeholder="Nice to virtually meet you as well!"
            />
            <Form.Button content="Send Message" />
          </Form>
        </React.Fragment>
      );
    }
  };

  convoTable = () => {
    //if conversations are present in state, map through them with an onclick function
    //to expand messages
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
                    onClick={this.handleSetActiveConvoID}
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
    if (this.state.activeConvoID) {
      //if a conversation is active, render convoTable and messagesDisplay
      //otherwise, just convoTable
      return (
        <Segment>
          <Grid
            columns={2}
            // relaxed="very"
          >
            <Grid.Column>{this.convoTable()}</Grid.Column>

            <Grid.Column>{this.messagesDisplay()}</Grid.Column>
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
