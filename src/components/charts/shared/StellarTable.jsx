import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { getSunValue, getMean } from '../../../lib/utilities';
import Table from '../../site/forms/Table';
import StellarValue from './StellarValue';
import StellarTableCell from './StellarTableCell';
// import StellarValueRange from './StellarValueRange';

class StellarTable extends React.PureComponent {
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

  getRows(answers, colTitles, rowTitles, answerIds) {
    const rows = [].concat(rowTitles);

    for (let j = 0; j < rows.length; j += 1) {
      const row = rows[j];
      const accessor = row[0].toLowerCase();

      answerIds[j].forEach(id => {
        row.push(<StellarTableCell answer={answers[id]} accessor={accessor} />);
      });

      row.push(<StellarValue value={getSunValue(accessor)} type={accessor} />);
    }

    return rows;
  }

  render() {
    const { answers, answerIds, colTitles, rowTitles } = this.props;

    return (
      <Table
        className="stellar-properties"
        colTitles={colTitles}
        includeRowTitles
        rows={this.getRows(answers, colTitles, rowTitles, answerIds)}
      />
    );
  }
}

StellarTable.propTypes = {
  answers: PropTypes.object,
  answerIds: PropTypes.array,
  colTitles: PropTypes.array,
  rowTitles: PropTypes.array,
};

export default StellarTable;
