import React from 'react';
import PropTypes from 'prop-types';

class Prompts extends React.PureComponent {
  render() {
    const { label } = this.props;

    return <p>{label}</p>;
  }
}

Prompts.propTypes = {
  label: PropTypes.string,
};

export default Prompts;
