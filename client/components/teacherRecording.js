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
import { Recorder, Editor, RecordingForm, Console, CustomPlayer } from './index';
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
    //this may need to get updated to passing in event and dotting off the event.
    let element = document.getElementsByClassName('button')[0];
    element.classList.toggle('active');
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
      .post('https://replicode-api.herokuapp.com/', { code: this.state.editorCode })
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
      url: '/api/aws/upload',
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
    console.log('isPLayback =====> ', this.props.isPlayback);
    return (
      <div>
        <Container className="editors-body">
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
        </Container>
        {this.props.blobURL ? (
          <div className="recordFooter">
            <div className="display-block">
              <RecordingForm />
            </div>
            <div className="display-block">
              <Button
                className="footer-button"
                color="danger"
                size="lg"
                onClick={() => {
                  this.props.deleteBlob();
                  this.props.deleteTextState();
                  this.props.deleteConsoleState();
                }}
                type="button"
              >
                DELETE
              </Button>
            </div>
            <CustomPlayer
              src={this.props.blobURL}
              onTimeUpdate={this.onPlayback}
              onPlay={this.props.startPlay}
              onPause={this.props.stopPlay}
              isPlayback={this.props.isPlayback}
            />
            <div className="display-block">
              <Button className="footer-button" size="lg" color="info" onClick={this.run}>
                RUN
              </Button>
            </div>
          </div>
        ) : (
            <div className="recordFooter">
              <Col className="display-block">
                <div className="button" onClick={this.startStopRecording}>
                  <div className="inner" />
                </div>
              </Col>
              <Col className="display-block">
                <Recorder />
              </Col>
              <Col className="display-block">
                <Button color="info footer-button" size="lg" onClick={this.run}>
                  RUN
              </Button>
              </Col>
            </div>
          )}
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


// <div className="display-block">
// <audio
//   // className="footer-button"
//   controls
//   src={this.props.blobURL}
//   onTimeUpdate={this.onPlayback}
//   onPlay={this.props.startPlay}
//   onPause={this.props.stopPlay}
// />
// </div>