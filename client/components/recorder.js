import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactMic } from 'react-mic';
import axios from 'axios';
import { startRec, stopRec } from '../store';

class Recorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blob: '',
      blobURL: '',
    };
    this.startStopRecording = this.startStopRecording.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  startStopRecording = () => {
    if (this.props.isRecord) {
      this.props.stop();
    } else {
      this.props.start(Date.now());
    }
  };

  onStop(recordedBlob) {
    let { blob, blobURL } = recordedBlob;
    this.setState({ blob, blobURL });
  }

  onSubmit() {
    let formData = new FormData();
    formData.append('theAudio', this.state.blob);

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
        <button onClick={this.onSubmit} type="button">
          Submit
        </button>
        <button>
          playback <audio controls src={this.state.blobURL} />
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
