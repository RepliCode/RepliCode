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
        <div className="col-md-7 main-content">
          <h3>Placeholder</h3>
          <p>Placeholder </p>

          <div className="white-box">
            <ul>
              <li>
                <p className="">Placeholder</p>
              </li>
              <li>
                <p className="">Placeholder </p>
              </li>
              <li>
                <p className="">Placeholder</p>
              </li>
            </ul>
          </div>
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
