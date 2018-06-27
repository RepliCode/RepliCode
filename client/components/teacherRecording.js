import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { startRec, stopRec, getBlob } from '../store';
import { Recorder, Editor } from './index';
import { Container, Row, Col } from 'reactstrap';

class TeacherRecording extends Component {
  constructor(props) {
    super(props);
    this.startStopRecording = this.startStopRecording.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.runCode = this.runCode.bind(this);
  }

  startStopRecording = () => {
    if (this.props.isRecord) {
      this.props.stop();
    } else {
      this.props.start(Date.now());
    }
  };

  runCode = () => {
    console.log('hey');
  };

  onSubmit() {
    let formData = new FormData();
    formData.append('theAudio', this.props.blob);

    let request = {
      url: 'http://localhost:8080/api/aws/upload',
      method: 'POST',
      data: formData,
      processData: false,
      contentType: false,
    };
    axios(request)
      .then(res => res.data)
      .then(result => {
        console.log(result);
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="6">
            <Editor />
          </Col>
          <Col xs="6">
            <Recorder />
            <button onClick={this.startStopRecording} type="button">
              Start/Stop
            </button>
            <button onClick={this.onSubmit} type="button">
              Submit
            </button>
            <button onClick={this.runCode}>Run Code!</button>
            <button>playback {/*<audio controls src={this.state.blobURL} />*/}</button>
          </Col>
        </Row>
      </Container>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isRecord: state.recorder.isRecord,
    startTime: state.recorder.startTime,
    blob: state.recorder.blob,
    blobURL: state.recorder.blobURL,
    timestamps: state.editor,
  };
};

const mapDispatch = dispatch => {
  return {
    start: startTime => dispatch(startRec(startTime)),
    stop: () => dispatch(stopRec()),
    saveBlob: blob => dispatch(getBlob(blob)),
  };
};

export default connect(mapState, mapDispatch)(TeacherRecording);
