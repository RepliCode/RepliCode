import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink } from 'reactstrap';

class AuthModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle}>Login</NavLink>
        <Modal
          isOpen={this.state.modal}
          modalTransition={{ timeout: 500 }}
          backdropTransition={{ timeout: 1000 }}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalBody style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
            <Button style={{ display: 'flex', alignItems: 'center' }}>
              <i className="fab fa-github-square fa-3x" style={{ marginRight: '1rem' }} /> Login
              with GitHub
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AuthModal;
