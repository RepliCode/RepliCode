import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactMic } from 'react-mic';
import axios from 'axios';
import blobToBase64 from 'blob-to-base64';

export default class Recorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      blob: '',
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

    blobToBase64(recordedBlob.blob, function(error, base64) {
      if (!error) {
        axios
          .post('/api/aws/upload', base64)
          .then(res => res.data)
          .then(result => {
            console.log(result);
          });
      }
    });
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
          playback <audio controls src="#" />
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
