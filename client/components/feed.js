import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import { LessonCard } from './index';
import { Link } from 'react-router-dom';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Your Subscriptions</h1>
        <Container>
          <Row className="text-center">
            {this.props.subscriptions.map((user, i) => (
              <div key={i}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ flexBasis: '20vw', margin: '2rem' }}>
                    <img id="user-image-frame" src={user.imageURL} />
                    <h2 style={{ color: 'black', textAlign: 'center' }}>{user.name || ''}</h2>
                    <p className="not-centered">{user.bio || ''}</p>
                  </div>
                  {user.lessons.map(lesson => {
                    return (
                      <div key={lesson.id} style={{ flexBasis: '20vw', margin: '.5rem' }}>
                        <LessonCard lesson={lesson} />
                      </div>
                    );
                  })}
                </div>
                <hr />
              </div>
            ))}
            {this.props.subscriptions.length ? null : (
              <h3>
                {' '}
                No Subscriptions? Check out some of our content <Link to="/lessons">here!</Link>
              </h3>
            )}
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
