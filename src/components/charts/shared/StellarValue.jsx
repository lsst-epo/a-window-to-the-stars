import React from 'react';
import PropTypes from 'prop-types';
import { getValue } from '../../../lib/utilities.js';
import StellarUnit from './StellarUnit';

class StellarValue extends React.PureComponent {
  render() {
    const { type, value, isSvg } = this.props;

    return (
      <React.Fragment>
        {!isSvg && <span>{getValue(type, value)}</span>}
        {isSvg && <tspan>{getValue(type, value)}</tspan>}
        <StellarUnit type={type} isSvg={isSvg} />
      </React.Fragment>
    );
  }
}

StellarValue.propTypes = {
  type: PropTypes.string,
  value: PropTypes.any,
  isSvg: PropTypes.bool,
};

export default StellarValue;
