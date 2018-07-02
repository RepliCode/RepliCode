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
    let lessonId = Number(this.props.match.params.lessonId);
    let lesson = this.props.lessons.filter(lesson => lesson.id === lessonId)[0] || {
      editor: {},
      console: {},
    };
    this.setState({ lesson });
    this.props.setTextState(lesson.editor);
    this.props.setConsoleState(lesson.console);
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

  openNav() {
    document.getElementById('mySidenav').style.width = '30vw';
    document.getElementsByClassName('container')[0].style.marginLeft = '30vw';
    document.getElementsByClassName('container')[0].style.width = 'calc(100% - 30vw)';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.getElementsByClassName('container')[0].style.marginLeft = '70px';
    document.getElementsByClassName('container')[0].style.width = '100%';
  }

  render() {
    console.log('single lesson playback');
    //this.state.lesson.audioURL
    return (
      <div>
        <div id="mySidenav" className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>
            &times;
          </a>
          <h2 style={{ color: 'white', textAlign: 'center' }}>{this.state.lesson.title || ''}</h2>
          <p>
            this is a lessonthis is a lessonthis is a lessonthis is a lessonthis is a lessonthis is
            a lessonthis is a lessonthis is a lessonthis is a lessonthis is a lessonthis is a
            lessonthis is a lessonthis is a lessonthis is a lessonthis is a lessonthis is a
            lessonthis is a lessonthis is a lessonthis is a lessonthis is a lessonthis is a
            lessonthis is a lessonthis is a lessonthis is a lessonthis is a lessonthis is a
            lessonthis is a lessonthis is a lessonthis is a lesson
          </p>
          <iframe
            //https://docs.google.com/presentation/d/e/2PACX-1vRJXfqGzbK5vJUp5um-Ucm_vF5PonpkDMWA7HORbVqLlYZusMTyjuedpsJTKilHUI8RUqd_EOoytxEy/embed?start=false&loop=false&delayms=3000
            src="https://docs.google.com/presentation/d/e/2PACX-1vQO_HQnIUQ8dTJB_kx8V54K9kPR2_eEqp3oFNYpDzReDz8M3ec8Cg58HBh9HVOwevy1vCsfXlMDS8vM/embed"
            frameBorder="0"
            width="100%"
            height="50%"
            allowFullScreen="true"
            mozallowfullscreen="true"
            webkitllowfullscreen="true"
          />
        </div>
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
        </Container>
        {this.state.lesson.audioURL ? (
          <div className="recordFooter">
            <span
              style={{ fontSize: '30px', cursor: 'pointer', color: 'black', marginLeft: '2rem' }}
              onClick={this.openNav}
            >
              &#9432;
            </span>

            <Col className="display-block offset-3">
              <audio
                className="footer-button"
                controls
                src={this.state.lesson.audioURL}
                onTimeUpdate={this.onPlayback}
                onPlay={this.props.startPlay}
                onPause={this.props.stopPlay}
                onEnded={event => {	
-                  console.log('done', event.target.currentTime);	
-                }}
              />
            </Col>
            <Col className="display-block">
              <Button className="footer-button" color="info" onClick={this.run}>
                Run
              </Button>
            </Col>
          </div>
        ) : (
          <div className="recordFooter">
            <Col className="display-block">
              <h1 style={{ color: 'black' }}>This Lesson Cannot Be Found!!!</h1>
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
    setConsoleState: timestamps => dispatch(setConsoleState(timestamps)),
  };
};

export default connect(mapState, mapDispatch)(SingleLesson);
