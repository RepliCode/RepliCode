import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Login,
  Signup,
  UserHome,
  Lessons,
  SingleLesson,
  TeacherRecording,
  LandingPage,
  Feed,
} from './components';
import { me, getLessonsThunk, getSubscriptionsThunk } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();

    axios
      .post('https://replicode-api.herokuapp.com/', { code: "'We are ready to evaluate code!'" })
      .then(evaluation => {
        console.log(evaluation.data)
      })
      .catch((error) => {
        console.log('We can\'t evaluate code right now: ', error)
      })
  }
  componentDidUpdate(prevProps) {
    if (this.props.isLoggedIn !== prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.getSubscriptionsThunk(this.props.userId);
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/lessons" component={Lessons} />
        <Route path="/lessons/:lessonId" component={SingleLesson} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/create" component={TeacherRecording} />
            <Route path="/feed" component={Feed} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(getLessonsThunk());
    },
    getSubscriptionsThunk(userId) {
      dispatch(getSubscriptionsThunk(userId));
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
