import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactMic } from 'react-mic';
import axios from 'axios';
import blobToBase64 from 'blob-to-base64';
import FormData from 'form-data';

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
    let { blob } = recordedBlob;
    console.log('recordedBlob is: ', blob);
    console.log('WILL POST', blob);
    let formData = new FormData();
    formData.append('theAudio', blob);
    console.log('here form data', formData);
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
          playback <audio controls src="https://s3.us-east-2.amazonaws.com/replicode/testfile81" />
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
