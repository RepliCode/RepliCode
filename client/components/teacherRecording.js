import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { startRec, stopRec, getBlob, startPlay, stopPlay } from '../store';
import { Recorder, Editor } from './index';
import { Container, Row, Col } from 'reactstrap';

class TeacherRecording extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playbackTime: 0,
    };
    this.startStopRecording = this.startStopRecording.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPlayback = this.onPlayback.bind(this);
  }

  startStopRecording = () => {
    if (this.props.isRecord) {
      this.props.stop();
    } else {
      this.props.start(Date.now());
    }
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
  onPlayback(event) {
    let { currentTime } = event.target;
    this.setState({ playbackTime: currentTime });
  }
  // togglePlayback() {
  //   this.props.startPlay();
  // }
  render() {
    // console.log('prizzops', this.props);
    return (
      <Container>
        <Row>
          <Col>
            <Editor playbackTime={this.state.playbackTime} />
          </Col>
          <Col>
            <Recorder />
            {this.props.blobURL ? (
              <div>
                <audio
                  controls
                  src={this.props.blobURL}
                  onTimeUpdate={this.onPlayback}
                  onPlay={this.props.startPlay}
                  onPause={this.props.stopPlay}
                />
                <button onClick={this.onSubmit} type="button">
                  {' '}
                  Submit{' '}
                </button>
              </div>
            ) : (
              <button onClick={this.startStopRecording} type="button">
                Start/Stop
              </button>
            )}
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
  };
};

export default connect(mapState, mapDispatch)(TeacherRecording);
