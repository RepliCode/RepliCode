import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import { LessonCard } from './index';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1 className="display-3" style={{ textAlign: 'center' }}>
          Subscriptions Feed
        </h1>
        <Container>
          <Row className="text-center">
            {this.props.subscriptions.map((user, i) => (
              //lessons would be under user.lessons
              <div key={i} className="col-3" style={{ margin: '2rem' }}>
                <img id="user-image-frame" src={user.imageURL} />
                <h2 style={{ color: 'black', textAlign: 'center' }}>{user.name || ''}</h2>
                <br />
                <p className="not-centered">{this.state.creator.bio || ''}</p>
                <LessonCard lesson={lesson} />
              </div>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    lessons: state.lessons.lessons,
    subscriptions: state.subscriptions.subscriptions,
    lessonCreators: state.lessonCreators,
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(Feed);
