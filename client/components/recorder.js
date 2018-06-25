import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export default class Recorder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>Hello Recorder</div>;
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
