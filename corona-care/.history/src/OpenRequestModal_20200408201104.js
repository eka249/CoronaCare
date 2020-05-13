import React, { Component } from "react";
import { Modal, Form, Header, Button } from "semantic-ui-react";

class OpenRequestModal extends Component {
  render() {
    return (
      <Modal trigger={<Button>Multiple Modals</Button>}>
        <Modal.Header>Modal #1</Modal.Header>
        <Modal.Content image>
          <div className="image">
            <Icon name="right arrow" />
          </div>
          <Modal.Description>
            <p>We have more to share with you. Follow us along to modal 2</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <NestedModal />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default OpenRequestModal;
