import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactMic } from 'react-mic';
import axios from 'axios';
import { startRec, stopRec } from '../store/recorder';

class Recorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blob: '',
    };
    this.startStopRecording = this.startStopRecording.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  startStopRecording = () => {
    if (this.props.isRecord) {
      this.props.stop();
    } else {
      this.props.start(Date.now());
    }
  };

  onStop(recordedBlob) {
    let { blob } = recordedBlob;
    let formData = new FormData();
    formData.append('theAudio', blob);

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
    console.log('*****', this.props);
    return (
      <div>
        <ReactMic
          record={this.props.isRecord}
          className="sound-wave"
          onStop={this.onStop}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
        <button onClick={this.startStopRecording} type="button">
          Start/Stop
        </button>
        <button>
          playback <audio controls src="#" />
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
  };
};

const mapDispatch = dispatch => {
  return {
    start: startTime => dispatch(startRec(startTime)),
    stop: () => dispatch(stopRec()),
  };
};

export default connect(mapState, mapDispatch)(Recorder);
