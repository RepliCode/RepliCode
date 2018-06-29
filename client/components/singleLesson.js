import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { startPlay, stopPlay, runCode, setConsoleState } from '../store';
import { Editor, Console } from './index';
import { Container, Row, Col, Button } from 'reactstrap';
import 'brace/mode/jsx';

class SingleLesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playbackTime: 0,
      editorCode: '',
      consoleCode: '',
    };
    this.consoleTimeStamp = {};
    this.onPlayback = this.onPlayback.bind(this);
    this.run = this.run.bind(this);
    this.getEditorCode = this.getEditorCode.bind(this);
  }

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

  onPlayback(event) {
    let { currentTime } = event.target;
    this.setState({ playbackTime: currentTime });
  }

  render() {
    console.log('PRIZZOPSZZ', this.props);
    return (
      <Container>
        <Row>
          <Col xs="6">
            <Editor sendEditorCode={this.getEditorCode} playbackTime={this.state.playbackTime} />
          </Col>
          <Col xs="6">
            <Col>
              <audio
                controls
                src="test"
                onTimeUpdate={this.onPlayback}
                onPlay={this.props.startPlay}
                onPause={this.props.stopPlay}
              />
              <Row>
                <Col>
                  <Button onClick={this.run}>Run</Button>
                </Col>
              </Row>
            </Col>
            <Console
              timeStamps={this.consoleTimeStamp}
              consoleValue={this.state.consoleCode}
              playbackTime={this.state.playbackTime}
            />
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
    recorder: state.recorder,
    startTime: state.recorder.startTime,
    timestamps: state.editor,
    isPlayback: state.recorder.isPlayback,
    user: state.user,
    lessons: state.lessons,
  };
};

const mapDispatch = dispatch => {
  return {
    startPlay: () => dispatch(startPlay()),
    stopPlay: () => dispatch(stopPlay()),
    evaluateCode: code => dispatch(runCode(code)),
    deleteConsoleState: () => dispatch(deleteConsoleState()),
  };
};

export default connect(mapState, mapDispatch)(SingleLesson);
