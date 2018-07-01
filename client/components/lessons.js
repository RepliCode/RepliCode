import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';

const cats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

class Lessons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Col>
          <Row>
            <h1>This is the homepage</h1>
          </Row>
          <Row>
            {this.props.lessons.map((lesson, i) => (
              <Col key={i} xs="auto">
                <h1>{lesson.title}</h1>
              </Col>
            ))}
          </Row>
        </Col>
      </Container>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    lessons: state.lessons.lessons,
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(Lessons);
