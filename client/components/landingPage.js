import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const LandingPage = props => {
  const { email } = props;

  return (
    <div>
      <div className="jumbotron">
        <div className="animated fadeInDown">
          <div className="container">
            <div className="col-12">
              <h1>
                <div className="content">
                  <div className="content__container">
                    <ul className="content__container__list">
                      <li className="content__container__list__item">Learn Programming</li>
                      <li className="content__container__list__item">Teach Programming</li>
                      <li className="content__container__list__item">Learn Programming</li>
                      <li className="content__container__list__item">Teach Programming</li>
                    </ul>
                  </div>
                </div>
              </h1>
              <hr
                style={{
                  width: '26%',
                  textAlign: 'left',
                  margin: '30px 0',
                  border: '2.5px solid #fff',
                }}
              />
            </div>
            <div className="col-8">
              <h2 className="subtitle">
                Welcome to the one-stop platform for creating and viewing interactive coding
                tutorials.
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container" id="main-wrapper">
        <div className="col-7 main-content">
          <p className="lead">
            Learning to code can be difficult. Often, beginners seek out video coding tutorials to
            try learn a new concept. Unfortunately, video tutorials can feel like a passive learning
            experience because there is a barrier between the student and the code. RepliCode was
            built with this problem in mind. Students on RepliCode can edit and run the code in each
            lesson. We believe that this creates a more engaged learning experience.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
  };
};

export default connect(mapState)(LandingPage);

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string,
// };
