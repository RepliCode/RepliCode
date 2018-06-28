import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  startRec,
  stopRec,
  getBlob,
  startPlay,
  stopPlay,
  deleteBlob,
  deleteTextState,
  runCode,
} from '../store';
import { Recorder, Editor, RecordingForm } from './index';
import { Container, Row, Col, Button } from 'reactstrap';

class TeacherRecording extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playbackTime: 0,
      editorCode: '',
    };
    this.startStopRecording = this.startStopRecording.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPlayback = this.onPlayback.bind(this);
    this.run = this.run.bind(this);
    this.getEditorCode = this.getEditorCode.bind(this);
  }

  startStopRecording = () => {
    if (this.props.isRecord) {
      this.props.stop();
    } else {
      this.props.start(Date.now());
    }
  };
  getEditorCode(editorCode) {
    this.setState({ editorCode });
  }
  run() {
    console.log('Pressed');
    console.log('Code?', this.state.editorCode);
    this.props.evaluateCode(this.state.editorCode);
  }

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
  onPlayback(event) {
    let { currentTime } = event.target;
    this.setState({ playbackTime: currentTime });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="6">
            <Editor sendEditorCode={this.getEditorCode} playbackTime={this.state.playbackTime} />
          </Col>
          <Col xs="6">
            {this.props.blobURL ? (
              <Col>
                <p>Preview Recording: </p>
                <audio
                  controls
                  src={this.props.blobURL}
                  onTimeUpdate={this.onPlayback}
                  onPlay={this.props.startPlay}
                  onPause={this.props.stopPlay}
                />
                <p>Are you happy with your recording?</p>
                <RecordingForm />
                <Button
                  onClick={() => {
                    this.props.deleteBlob();
                    this.props.deleteTextState();
                  }}
                  type="button"
                >
                  No, try again
                </Button>
              </Col>
            ) : (
              <Col>
                <Recorder />
                <Button onClick={this.startStopRecording} type="button">
                  Start/Stop
                </Button>
              </Col>
            )}
            <Col>
              <Button onClick={this.run}>Run</Button>
            </Col>
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
    isPlayback: state.recorder.isPlayback,
  };
};

const mapDispatch = dispatch => {
  return {
    start: startTime => dispatch(startRec(startTime)),
    stop: () => dispatch(stopRec()),
    saveBlob: blob => dispatch(getBlob(blob)),
    startPlay: () => dispatch(startPlay()),
    stopPlay: () => dispatch(stopPlay()),
    deleteBlob: () => dispatch(deleteBlob()),
    deleteTextState: () => dispatch(deleteTextState()),
    evaluateCode: code => dispatch(runCode(code)),
  };
};

export default connect(mapState, mapDispatch)(TeacherRecording);
