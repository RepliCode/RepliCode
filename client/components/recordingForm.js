import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';

class RecordingForm extends React.Component {
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
        <Button color="primary" onClick={this.toggle}>
          Yes, continue
        </Button>
        <Modal
          isOpen={this.state.modal}
          modalTransition={{ timeout: 700 }}
          backdropTransition={{ timeout: 1300 }}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Recording information</ModalHeader>
          <ModalBody>
            <Form>
              <Label for="name">Your Name</Label>
              <Input type="text" name="name" id="recording-author-name" />
              <Label for="title">Lesson Title</Label>
              <Input
                type="text"
                name="title"
                id="recording-title"
                placeholder="Insert title here"
              />
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="recording-description"
                placeholder="Give a brief description of your lesson"
              />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(null, null)(RecordingForm);
