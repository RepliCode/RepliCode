import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  startPlay,
  stopPlay,
  runCode,
  setConsoleState,
  deleteConsoleState,
  setTextState,
} from '../store';
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
      lesson: {},
    };
    this.consoleTimeStamp = {};
    this.onPlayback = this.onPlayback.bind(this);
    this.run = this.run.bind(this);
    this.getEditorCode = this.getEditorCode.bind(this);
    this.filterLesson = this.filterLesson.bind(this);
  }

  getEditorCode(editorCode) {
    this.setState({ editorCode });
  }
  filterLesson() {
    // let lessonId = Number(this.props.match.params.lessonId)
    // this.props.lessons.filter(lesson => lesson.id === lessonId)
    let hardCodedLesson = this.props.lessons[5];
    console.log('hard', hardCodedLesson);
    this.setState({ lesson: hardCodedLesson });
    this.props.setTextState(hardCodedLesson.editor);
  }
  componentDidUpdate(prevProps) {
    if (this.props.lessons !== prevProps.lessons) {
      this.filterLesson();
    }
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
    console.log('single lesson playback', this.state.playbackTime);
    return this.state.lesson.audioURL ? (
      <Container>
        <Row>
          <Col xs="6">
            <Editor sendEditorCode={this.getEditorCode} playbackTime={this.state.playbackTime} />
          </Col>
          <Col xs="6">
            <Col>
              <audio
                controls
                src={this.state.lesson.audioURL}
                onTimeUpdate={this.onPlayback}
                onPlay={this.props.startPlay}
                onPause={this.props.stopPlay}
                onEnded={event => {
                  console.log('done', event.target.currentTime);
                }}
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
    ) : null;
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
    lessons: state.lessons.lessons,
  };
};

const mapDispatch = dispatch => {
  return {
    startPlay: () => dispatch(startPlay()),
    stopPlay: () => dispatch(stopPlay()),
    evaluateCode: code => dispatch(runCode(code)),
    deleteConsoleState: () => dispatch(deleteConsoleState()),
    setTextState: timestamps => dispatch(setTextState(timestamps)),
  };
};

export default connect(mapState, mapDispatch)(SingleLesson);
