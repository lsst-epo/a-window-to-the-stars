import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/lsst-logo.svg';

class NoMatch extends React.PureComponent {
  render() {
    const { location } = this.props;

    return (
      <div className="container-flex direction-column centered middle">
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
        <div>
          <Link to="/">Return Home</Link>
        </div>
        <div>
          <Link to="/" className="logo-wrapper">
            <span className="screen-reader-only">Home</span>
            <img aria-hidden src={logo} alt="LSST Logo" className="site-logo" />
          </Link>
        </div>
      </div>
    );
  }
}

NoMatch.propTypes = {
  location: PropTypes.object,
};

export default NoMatch;
