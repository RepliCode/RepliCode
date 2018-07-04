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
  subscribe,
  unsubscribe,
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
    this.toggleSubscribe = this.toggleSubscribe.bind(this);
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
  toggleSubscribe(subscribedBoolean) {
    let { userId } = this.state.lesson;
    if (subscribedBoolean) {
      this.props.unsubscribe(userId);
    } else {
      this.props.subscribe(userId);
    }
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
    let { userId } = this.state.lesson;
    let subscribed = this.props.subscriptions.some(subscription => {
      return subscription.id === userId;
    });

    return (
      <div>
        <div id="mySidenav" className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>
            &times;
          </a>
          {this.props.user.id ? (
            subscribed ? (
              <Button onClick={() => this.toggleSubscribe(subscribed)}>
                UNSUBSCRIBE <i className="far fa-check-circle" />
              </Button>
            ) : (
              <Button onClick={() => this.toggleSubscribe(subscribed)}>
                SUBSCRIBE <i className="fas fa-plus-circle" />
              </Button>
            )
          ) : null}
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
        {this.state.lesson.audioURL ? (
          <div className="recordFooter">
            <div>
              <span
                style={{ fontSize: '30px', cursor: 'pointer', color: 'black', marginLeft: '2rem' }}
                onClick={this.openNav}
              >
                &#9432;
              </span>
            </div>
            <div className="display-block">
              <audio
                controls
                src={this.state.lesson.audioURL}
                onTimeUpdate={this.onPlayback}
                onPlay={this.props.startPlay}
                onPause={this.props.stopPlay}
                onEnded={event => console.log('done', event.target.currentTime)}
              />
            </div>
            <div className="display-block">
              <Button className="footer-button" color="info" size="lg" onClick={this.run}>
                RUN
              </Button>
            </div>
          </div>
        ) : (
          <div className="recordFooter">
            <div className="display-block">
              <h1 style={{ color: 'black' }}>This Lesson Cannot Be Found!!!</h1>
            </div>
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
    subscriptions: state.subscriptions.subscriptions,
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
    subscribe: userId => dispatch(subscribe(userId)),
    unsubscribe: userId => dispatch(unsubscribe(userId)),
  };
};

export default connect(mapState, mapDispatch)(SingleLesson);
