import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import { LessonCard } from './index';

const img =
  'data:image/jpeg;base64,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';

const cats = [
  {
    name: 'this is a category',
    description:
      "This is a lengthy descriptionription of nothing, nothing at all. I don't even know why I wrote this much, but hey while i have your attention, how's your day?",
  },
  {
    name: 'this is a category',
    description:
      "This is a lengthy descriptionription of nothing, nothing at all. I don't even know why I wrote this much, but hey while i have your attention, how's your day?",
  },
  {
    name: 'this is a category',
    description:
      "This is a lengthy descriptionription of nothing, nothing at all. I don't even know why I wrote this much, but hey while i have your attention, how's your day?",
  },
  {
    name: 'this is a category',
    description:
      "This is a lengthy descriptionription of nothing, nothing at all. I don't even know why I wrote this much, but hey while i have your attention, how's your day?",
  },
  {
    name: 'this is a category',
    description:
      "This is a lengthy descriptionription of nothing, nothing at all. I don't even know why I wrote this much, but hey while i have your attention, how's your day?",
  },
  {
    name: 'this is a category',
    description:
      "This is a lengthy descriptionription of nothing, nothing at all. I don't even know why I wrote this much, but hey while i have your attention, how's your day?",
  },
  {
    name: 'this is a category',
    description:
      "This is a lengthy descriptionription of nothing, nothing at all. I don't even know why I wrote this much, but hey while i have your attention, how's your day?",
  },
  {
    name: 'this is a category',
    description:
      "This is a lengthy descriptionription of nothing, nothing at all. I don't even know why I wrote this much, but hey while i have your attention, how's your day?",
  },
  {
    name: 'this is a category',
    description:
      "This is a lengthy descriptionription of nothing, nothing at all. I don't even know why I wrote this much, but hey while i have your attention, how's your day?",
  },
  {
    name: 'this is a category',
    description:
      "This is a lengthy descriptionription of nothing, nothing at all. I don't even know why I wrote this much, but hey while i have your attention, how's your day?",
  },
  {
    name: 'this is a category',
    description:
      "This is a lengthy descriptionription of nothing, nothing at all. I don't even know why I wrote this much, but hey while i have your attention, how's your day?",
  },
];

class Lessons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container text-center">
            <h1 className="display-3 ">This is RepliCode!</h1>
            <p className="lead">
              A content creation platform for audio lead interacive coding walkthroughs.
            </p>
          </div>
        </div>
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
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(Lessons);
