import React from 'react';
import { withRouter } from 'react-router';
import reactn from 'reactn';
import PropTypes from 'prop-types';

@reactn
class ProgressContainer extends React.Component {
  componentDidMount() {
    this.updateProgress();
  }

  componentDidUpdate() {
    this.updateProgress();
  }

  formattedProgress(progress) {
    if (!progress) {
      return 0;
    }

    const id = progress.split('/')[1];

    if (id.length) {
      return parseInt(id, 10);
    }

    return 0;
  }

  updateProgress() {
    const { location } = this.props;

    this.dispatch.updateProgress(this.formattedProgress(location.pathname));
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

ProgressContainer.propTypes = {
  location: PropTypes.object,
  children: PropTypes.node,
};

export default withRouter(ProgressContainer);
