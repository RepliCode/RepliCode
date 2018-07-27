import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import { LessonCard } from './index';

class Lessons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 className="display-3" style={{ textAlign: 'center' }}>
          Subscriptions Feed
        </h1>
        <Container>
          <Row className="text-center">
            {this.props.lessons.map((lesson, i) => (
              <div key={i} className="col-3" style={{ margin: '2rem' }}>
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

export default connect(mapState, mapDispatch)(Lessons);
