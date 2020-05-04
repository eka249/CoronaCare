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
      response: null,
      activeConversation: null
    };
    this.fetchConvos();
  }

  fetchConvos = () => {
    //on load, fetch conversations from db for this user
    //set convos state as all conversations
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

  handleChange = (
    e //handle state when user is typing response message
  ) => this.setState({ response: e.target.value });

  handleRespond = () => {
    //if a message is sent, add it to the message model
    //fetch the conversations again so new message is availble for user
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
        messagetext: this.state.response
      })
    })
      .then(resp => resp.json())
      .then(this.fetchConvos());
  };

  handleSetActiveConvoID = e => {
    //if a conversation is clicked, make it active so the corresponding
    //messages can appear in feed
    //send to handleConvoClick which will filter through all converstions to find active
    this.setState(
      { ...this.state, activeConvoID: e.target.id },
      this.handleConvoClick
    );
  };

  handleConvoClick = () => {
    //finds the conversation that user clicked on from all
    //sets the state for activeConversation
    //sends activeConversation to messagesDisplay function
    let theConvo = this.state.convos.filter(
      convo => convo.id == this.state.activeConvoID
    );
    this.setState({
      ...this.state,
      activeConversation: theConvo
    });
    this.messagesDisplay();
  };

  messagesDisplay = () => {
    //if the activeConversation state has been set succesfully,
    //return the mapping of the corresponding messages in a feed
    if (this.state.activeConversation) {
      var theMessages = this.state.activeConversation[0].messages;
      console.log("test", test);

      return (
        <React.Fragment>
          <Feed>
            {theMessages.map((message, index) => {
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
