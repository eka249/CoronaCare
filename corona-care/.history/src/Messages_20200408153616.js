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
      .then(console.log("user", this.props.user))
      .then(data => console.log(data));
  }

  render() {
    return (
      //   <Route
      //     exact
      //     path="/myconvos"
      //     render={props => (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Conversations</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {/* <Table.Row>
                  {this.props.user.convos.map(convo => {
                    return (
                      <Table.Cell> */}
            {/* add conditional ribbons if unread later; see semantic ui documentation */}
            {/* <Label>{convo.fromID.first_name}</Label>
                      </Table.Cell>
                    );
                  })} */}
            {/* </Table.Row> */}
          </Table.Body>
        </Table>
      </div>
      //     )}
      //   />
    );
  }

  //             /* if (conversation ID is active, render feed on the right) */

  //       <Table.Row>
  //         <Table.Cell>Cell</Table.Cell>
  //         <Table.Cell>Cell</Table.Cell>
  //         <Table.Cell>Cell</Table.Cell>
  //       </Table.Row>
  //       <Table.Row>
  //         <Table.Cell>Cell</Table.Cell>
  //         <Table.Cell>Cell</Table.Cell>
  //         <Table.Cell>Cell</Table.Cell>
  //       </Table.Row>
  //     </Table.Body>

  //     <Table.Footer>
  //       <Table.Row>
  //         <Table.HeaderCell colSpan='3'>
  //           <Menu floated='right' pagination>
  //             <Menu.Item as='a' icon>
  //               <Icon name='chevron left' />
  //             </Menu.Item>
  //             <Menu.Item as='a'>1</Menu.Item>
  //             <Menu.Item as='a'>2</Menu.Item>
  //             <Menu.Item as='a'>3</Menu.Item>
  //             <Menu.Item as='a'>4</Menu.Item>
  //             <Menu.Item as='a' icon>
  //               <Icon name='chevron right' />
  //             </Menu.Item>
  //           </Menu>
  //         </Table.HeaderCell>
  //       </Table.Row>
  //     </Table.Footer>
  //   </Table>
  // )

  // const events = [
  //   {
  //     date: '1 Hour Ago',
  //     image: '/images/avatar/small/elliot.jpg',
  //     meta: '4 Likes',
  //     summary: 'Elliot Fu added you as a friend',
  //   },
  //   {
  //     date: '4 days ago',
  //     image: '/images/avatar/small/helen.jpg',
  //     meta: '1 Like',
  //     summary: 'Helen Troy added 2 new illustrations',
  //     extraImages: [
  //       '/images/wireframe/image.png',
  //       '/images/wireframe/image-text.png',
  //     ],
  //   },
  //   {
  //     date: '3 days ago',
  //     image: '/images/avatar/small/joe.jpg',
  //     meta: '8 Likes',
  //     summary: 'Joe Henderson posted on his page',
  //     extraText:
  //       "Ours is a life of constant reruns. We're always circling back to where we'd we started.",
  //   },
  //   {
  //     date: '4 days ago',
  //     image: '/images/avatar/small/justen.jpg',
  //     meta: '41 Likes',
  //     summary: 'Justen Kitsune added 2 new photos of you',
  //     extraText:
  //       'Look at these fun pics I found from a few years ago. Good times.',
  //     extraImages: [
  //       '/images/wireframe/image.png',
  //       '/images/wireframe/image-text.png',
  //     ],
  //   },
  // ]

  // const FeedExampleEventsProp = () => <Feed events={events} />
}
export default Messages;
