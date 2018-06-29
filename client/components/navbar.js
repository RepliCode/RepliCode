import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../store';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar color="light" light expand="sm">
        <NavbarBrand href="/">RepliCode</NavbarBrand>
        <Collapse isOpen={true} navbar>
          {this.props.isLoggedIn ? (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <div onClick={this.clicker}>
                  <NavLink href="/">Logout</NavLink>
                </div>
              </NavItem>
            </Nav>
          ) : (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signup">Signup</NavLink>
              </NavItem>
            </Nav>
          )}
        </Collapse>
      </Navbar>
    );
  }
}

// const Navbar = ({handleClick, isLoggedIn}) => (
//   <div>
//     <h1>RepliCode</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// )

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(NavigationBar);

/**
 * PROP TYPES
 */
NavigationBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
