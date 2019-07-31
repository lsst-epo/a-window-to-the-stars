import React from 'react';
import PropTypes from 'prop-types';
import { getValue } from '../../../lib/utilities.js';
import StellarUnit from './StellarUnit';

class StellarValue extends React.PureComponent {
  render() {
    const { type, value } = this.props;

    return (
      <React.Fragment>
        <span>{getValue(type, value)}</span>
        <StellarUnit type={type} />
      </React.Fragment>
    );
  }
}

StellarValue.propTypes = {
  type: PropTypes.string,
  value: PropTypes.any,
};

export default StellarValue;
