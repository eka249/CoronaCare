import React, { Component } from "react";
import { Modal, Header, Button } from "semantic-ui-react";
import RespondToRequest from "./RespondToRequest";

class OpenRequestModal extends Component {
  render() {
    return (
      <Modal trigger={<Button>Multiple Modals</Button>}>
        <Modal.Header>Modal #1</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <p>We have more to share with you. Follow us along to modal 2</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <RespondToRequest />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default OpenRequestModal;
