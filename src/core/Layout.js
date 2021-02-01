import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from '../auth/helpers';

const Layout = ({ match, children, history }) => {
  const isActive = (path) => {
    if (history.location.pathname === path) {
      return { color: 'grey' };
    } else {
      return { color: 'white' };
    }
  };

  const nav = () => (
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link to="/" className="nav-link" style={isActive('/')}>
          Home
        </Link>
      </li>
      {!isAuth() && (
        <>
          <li className="nav-item">
            <Link to="/signup" className="nav-link" style={isActive('/signup')}>
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signin" className="nav-link" style={isActive('/signin')}>
              Sign In
            </Link>
          </li>
        </>
      )}
      {isAuth() && isAuth().role === 'admin' && (
        <li className="nav-item text-white" style={{ cursor: 'pointer' }}>
          <Link to="/admin" className="nav-link" style={isActive('/admin')}>
            {isAuth().name}
          </Link>
        </li>
      )}
      {isAuth() && (
        <li className="nav-item">
          <span
            className="nav-link text-white"
            style={{ cursor: 'pointer' }}
            onClick={() =>
              signout(() => {
                history.push('/signin');
              })
            }
          >
            Sign out
          </span>
        </li>
      )}
    </ul>
  );
  return (
    <Fragment>
      {nav()}
      <div className="container">{children}</div>
    </Fragment>
  );
};

export default withRouter(Layout);
