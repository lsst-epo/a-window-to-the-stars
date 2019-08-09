import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { getMean } from '../../../lib/utilities';
import StellarValue from './StellarValue';
// import StellarValueRange from './StellarValueRange';

class StellarTableCell extends React.PureComponent {
  getCellValue(answer, accessor) {
    if (isEmpty(answer)) {
      return '';
    }

    if (Array.isArray(answer.content)) {
      // return <StellarValueRange data={answer.content} type={accessor} />;
      return (
        <StellarValue
          value={getMean(answer.content, accessor)}
          type={accessor}
        />
      );
    }

    return <StellarValue value={answer.content} type={accessor} />;
  }

  render() {
    const { answer, accessor } = this.props;

    return this.getCellValue(answer, accessor);
  }
}

StellarTableCell.propTypes = {
  answer: PropTypes.object,
  accessor: PropTypes.string,
};

export default StellarTableCell;
