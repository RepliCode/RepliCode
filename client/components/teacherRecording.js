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
  setConsoleState,
  deleteConsoleState,
} from '../store';
import { Recorder, Editor, RecordingForm, Console } from './index';
import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
} from 'reactstrap';
import 'brace/mode/jsx';

class TeacherRecording extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playbackTime: 0,
      editorCode: '',
      consoleCode: '',
    };
    this.consoleTimeStamp = {};
    this.startStopRecording = this.startStopRecording.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPlayback = this.onPlayback.bind(this);
    this.run = this.run.bind(this);
    this.getEditorCode = this.getEditorCode.bind(this);
  }

  startStopRecording = () => {
    if (this.props.recorder.isRecord) {
      this.props.stop();
    } else {
      this.props.start(Date.now());
    }
  };
  getEditorCode(editorCode) {
    this.setState({ editorCode });
  }
  run() {
    return axios
      .post('/api/sandBox', { code: this.state.editorCode })
      .then(evaluation => {
        return evaluation.data;
      })
      .then(consoleText => {
        if (this.props.recorder.isRecord) {
          this.consoleTimeStamp[Date.now() - this.props.recorder.startTime] = consoleText;
          this.props.setTimestamps(this.consoleTimeStamp);
        }
        this.setState({
          consoleCode: `> ${consoleText}`,
        });
      })
      .catch(console.error);
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
    console.log('PRIZZOPSZZ', this.props);
    return (
      <div>
        <Container>
          <Row>
            <Col className="editor-console-flex col-6">
              <Editor sendEditorCode={this.getEditorCode} playbackTime={this.state.playbackTime} />
            </Col>
            <Col className="editor-console-flex col-6">
              <Console
                timeStamps={this.consoleTimeStamp}
                consoleValue={this.state.consoleCode}
                playbackTime={this.state.playbackTime}
              />
            </Col>
          </Row>
          <Row>
            {this.props.blobURL && (
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
                <Row>
                  <Col>
                    <RecordingForm />
                  </Col>
                  <Col>
                    <Button
                      onClick={() => {
                        this.props.deleteBlob();
                        this.props.deleteTextState();
                        this.props.deleteConsoleState();
                      }}
                      type="button"
                    >
                      No, try again
                    </Button>
                  </Col>
                  <Col>
                    <Button onClick={this.run}>Run</Button>
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
        </Container>
        <div className="recordFooter">
          <Col className="display-block">
            <Button onClick={this.startStopRecording} type="button">
              Start/Stop
          </Button>
            {/*<div class="button">
              <div class="inner" />
            </div>*/}
          </Col>
          <Col className="display-block">
            <Recorder />
          </Col>
          <Col className="display-block">
            <Button onClick={this.run}>Run</Button>
          </Col>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    recorder: state.recorder,
    startTime: state.recorder.startTime,
    blob: state.recorder.blob,
    blobURL: state.recorder.blobURL,
    timestamps: state.editor,
    isPlayback: state.recorder.isPlayback,
    user: state.user,
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
    setTimestamps: timestamps => dispatch(setConsoleState(timestamps)),
    deleteConsoleState: () => dispatch(deleteConsoleState()),
  };
};

export default connect(mapState, mapDispatch)(TeacherRecording);
