import React from 'react';
import PropTypes from 'prop-types';
import StellarValue from './StellarValue';
import StellarValueRange from './StellarValueRange';

class ObservationsTableCell extends React.PureComponent {
  rangeChecker(answerRange) {
    if (!answerRange) return false;
    if (!answerRange[0] || !answerRange[1]) return false;
    if (answerRange[0].data[0] && answerRange[1].data[0]) return true;

    return false;
  }

  getCellValue(answer, answerRange, accessor) {
    if (answer) {
      return <StellarValue value={answer.content} type={accessor} />;
    }

    if (this.rangeChecker(answerRange)) {
      return (
        <StellarValueRange
          data={[answerRange[0].data[0], answerRange[1].data[0]]}
          type={accessor}
        />
      );
    }

    return '';
  }

  render() {
    const { answer, answerRange, accessor } = this.props;
    return this.getCellValue(answer, answerRange, accessor);
  }
}

ObservationsTableCell.propTypes = {
  answer: PropTypes.object,
  answerRange: PropTypes.array,
  accessor: PropTypes.string,
};

export default ObservationsTableCell;
