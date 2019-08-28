import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    const { location: prevLocation } = prevProps;
    const { location } = this.props;

    if (location.pathname !== prevLocation.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

ScrollToTop.propTypes = {
  location: PropTypes.string,
  children: PropTypes.node,
};

export default withRouter(ScrollToTop);
