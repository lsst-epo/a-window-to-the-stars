import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { getSunValue } from '../../../lib/utilities';
import Table from '../../site/forms/Table';
import StellarValue from './StellarValue';
import StellarValueRange from './StellarValueRange';

class StellarTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
    };
  }

  componentDidMount() {
    const { answers, answerIds, colTitles, rowTitles } = this.props;

    this.setState(prevState => ({
      ...prevState,
      rows: this.getRows(answers, colTitles, rowTitles, answerIds),
    }));
  }

  getCellValue(answer, accessor) {
    if (isEmpty(answer)) {
      return '';
    }

    if (Array.isArray(answer.content)) {
      return <StellarValueRange data={answer.content} type={accessor} />;
    }

    return <StellarValue value={answer.content} type={accessor} />;
  }

  getRows(answers, colTitles, rowTitles, answerIds) {
    const rows = [].concat(rowTitles);

    for (let j = 0; j < rows.length; j += 1) {
      const row = rows[j];
      const accessor = row[0].toLowerCase();

      answerIds[j].forEach(id => {
        row.push(this.getCellValue(answers[id], accessor));
      });

      row.push(<StellarValue value={getSunValue(accessor)} type={accessor} />);
    }

    return rows;
  }

  render() {
    const { colTitles } = this.props;
    const { rows } = this.state;

    return (
      <Table
        className="stellar-properties"
        colTitles={colTitles}
        includeRowTitles
        rows={rows}
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
