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
      messages: null,
      response: null
    };
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

  respond = () => {
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
    }).then(resp => resp.json());
    // .then(fetch)
    //observe how this works with data persistence
  };

  handleSetActiveConvo = e => {
    this.setState(
      { ...this.state, activeConvo: e.target.id },
      this.handleConvoClick
    );
  };

  handleConvoClick = () => {
    //necessary to make sure state is set before filtering
    let theMessages = this.state.convos.filter(
      convo => convo.id == this.state.activeConvo
    );
    var theMessage = theMessages[0].full_conversation[0];
    this.setState(
      {
        ...this.state,
        messages: theMessage
      }
      // console.log(
      //   "just set state for messages",
      //   this.state.messages,
      //   "this.state.activeConvo",
      //   this.state.activeConvo
      // )
    );
  };

  handleConvoDisplay = () => {
    if (this.state.messages != null) {
      return (
        <React.Fragment>
          <Feed>
            {this.state.messages.map(message => {
              return <Feed.Event>{message.messagetext}</Feed.Event>;
            })}
          </Feed>
          <Form>
            <Form.Field>
              <label>Enter Your Response Here:</label>
              <input placeholder="Nice to virtually meet you as well!" />
            </Form.Field>
          </Form>
        </React.Fragment>
      );
    } else return null;
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
    return <div>failed data div</div>;
  };

  render() {
    if (this.state.messages !== null) {
      return (
        <Segment>
          <Grid
            columns={2}
            // relaxed="very"
          >
            <Grid.Column>{this.convoTable()}</Grid.Column>
            <Grid.Column>{this.handleConvoDisplay()}</Grid.Column>
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
