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
import { addLessonThunk } from '../store';

class RecordingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
    this.handleForm = this.handleForm.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  handleForm(event) {
    event.preventDefault();
    // this.props.submitForm({
    //   name: event.target.name.value,
    //   title: event.target.title.value,
    //   description: event.target.description.value,
    // });
    let formFields = {
      name: event.target.name.value,
      title: event.target.title.value,
      description: event.target.description.value,
      blob: this.props.blob,
      editor: this.props.editor,
      console: this.props.console,
    };
    this.props.addLesson(formFields, Number(this.props.user.id));
    console.log('names', formFields, 'BLOB!?', this.props);
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
            <Form
              onSubmit={event => {
                console.log('submitted successfully');
                this.toggle();
                this.handleForm(event);
              }}
            >
              <Label for="name">Your Name</Label>
              <Input type="text" name="name" id="recording-author-name" />
              <Label for="title">Lesson Title</Label>
              <Input type="text" name="title" id="lesson-title" placeholder="Insert title here" />
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="recording-description"
                placeholder="Give a brief description of your lesson"
              />
              <Button color="primary" type="submit">
                Submit
              </Button>{' '}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapState = state => ({
  blob: state.recorder.blob,
  editor: state.editor,
  console: state.consoleEditor,
  user: state.user,
});

const mapDispatch = dispatch => ({
  addLesson: (formFields, userId) => dispatch(addLessonThunk(formFields, userId)),
});

export default connect(mapState, mapDispatch)(RecordingForm);
