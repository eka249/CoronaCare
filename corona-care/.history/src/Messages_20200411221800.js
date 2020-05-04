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

  state = ({
    activeConvo: null
  })

  handleConvoClick = (e, {id})=>{
    this.setState({activeConvo: id})
  }

  render() {
    return (
      <React.Fragment>
        {if (this.state.activeConvo != null){

return ( <Feed position="right">
    {this.props.user.conversations.map(convo => {
      return (
        <Feed.Event>
          {/* <Table.Cell onClick = {this.handleConvoClick} id = {convo.id}>
            {/* add conditional ribbons if unread later; see semantic ui
            documentation */}
            {convo.id}
          {/* </Table.Cell> */}
        </Feed.Event>
      );
    })}
  </Feed>
)}


      <div>
        <Table celled position="left">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Conversations</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.user.conversations.map(convo => {
              return (
                <Table.Row>
                  <Table.Cell onClick = {this.handleConvoClick} id = {convo.id}>
                    {/* add conditional ribbons if unread later; see semantic ui
                    documentation */}
                    {convo.id}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>


       
      </div>

    
    
  </React.Fragment>)}
}
export default Messages;
