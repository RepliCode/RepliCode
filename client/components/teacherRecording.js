import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { startRec, stopRec, getBlob } from '../store';
import { Recorder } from './index';

class TeacherRecording extends Component {
  constructor(props) {
    super(props);
    this.startStopRecording = this.startStopRecording.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  render() {
    return (
      <div>
        <Recorder />
        <button onClick={this.startStopRecording} type="button">
          Start/Stop
        </button>
        <button onClick={this.onSubmit} type="button">
          Submit
        </button>
        <button>
          playback {/*<audio controls src={this.state.blobURL} />*/}
        </button>
      </div>
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
    timestamps: state.editor
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
