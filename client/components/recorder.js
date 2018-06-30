import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactMic } from 'react-mic';
import axios from 'axios';
import { startRec, stopRec, getBlob } from '../store';

class Recorder extends React.Component {
  constructor(props) {
    super(props);
    this.onStop = this.onStop.bind(this);
  }

  onStop(recordedBlob) {
    let { blob, blobURL } = recordedBlob;
    this.props.saveBlob(blob, blobURL);
  }

  render() {
    return (
      <div>
        <ReactMic
          record={this.props.isRecord}
          className="sound-wave"
          onStop={this.onStop}
          strokeColor="#AF261F"
          backgroundColor="#F6FBE0"
        />
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
  };
};

const mapDispatch = dispatch => {
  return {
    start: startTime => dispatch(startRec(startTime)),
    stop: () => dispatch(stopRec()),
    saveBlob: (blob, blobURL) => dispatch(getBlob(blob, blobURL)),
  };
};

export default connect(mapState, mapDispatch)(Recorder);
