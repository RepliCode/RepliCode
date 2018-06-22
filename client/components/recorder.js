import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactMic } from 'react-mic';
import axios from 'axios';

export default class Recorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
    };
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  startRecording = () => {
    this.setState({
      record: true,
    });
  };

  stopRecording = () => {
    this.setState({
      record: false,
    });
  };

  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
    let reader = new FileReader();
    reader.addEventListener('loadend', () => {
      axios
        .post('/api/aws/upload', { blob: reader.result })
        .then(res => res.data)
        .then(result => {
          console.log(result);
        });
    });
    reader.readAsArrayBuffer(recordedBlob.blob);
  }

  render() {
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
        <button onClick={this.startRecording} type="button">
          Start
        </button>
        <button onClick={this.stopRecording} type="button">
          Stop
        </button>
        <button>
          playback{' '}
          <audio controls src="https://s3.us-east-2.amazonaws.com/replicode/testfile.webm" />
        </button>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//   }
// }

// export default connect(mapState, mapDispatch)(Navbar)
