import React from 'react';
import PropTypes from 'prop-types';

class StellarUnit extends React.PureComponent {
  getUnit(type) {
    if (type === 'temperature') {
      return <span className="unit">&nbsp;K</span>;
    }

    if (type === 'luminosity') {
      return (
        <span className="unit">
          &nbsp;L<sub>&#8857;</sub>
        </span>
      );
    }

    if (type === 'mass') {
      return (
        <span className="unit">
          &nbsp;M<sub>&#8857;</sub>
        </span>
      );
    }

    if (type === 'lifetime') {
      return <span className="unit">&nbsp;Gyr</span>;
    }

    if (type === 'radius') {
      return (
        <span className="unit">
          &nbsp;R<sub>&#8857;</sub>
        </span>
      );
    }

    return null;
  }

  render() {
    const { type } = this.props;

    return this.getUnit(type);
  }
}

StellarUnit.propTypes = {
  type: PropTypes.string,
};

export default StellarUnit;
