import React from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';
import Table from '../../site/forms/Table';
import ObservationsTableCell from './ObservationsTableCell';

class ObservationsTable extends React.PureComponent {
  getRows(answers, colTitles, rowTitles, answerIds) {
    const rows = [].concat(rowTitles);

    for (let j = 0; j < rows.length; j += 1) {
      const row = rows[j];

      answerIds[j].forEach(id => {
        const isRange = isArray(id);

        if (isRange) {
          row.push(
            <ObservationsTableCell
              answerRange={[answers[id[0]], answers[id[1]]]}
              accessor="temperature"
            />
          );
        } else {
          row.push(
            <ObservationsTableCell answer={answers[id]} accessor="count" />
          );
        }
      });
    }

    return rows;
  }

  render() {
    const { answers, answerIds, colTitles, rowTitles } = this.props;

    return (
      <Table
        className="hrd-observations"
        colTitles={colTitles}
        includeRowTitles
        rows={this.getRows(answers, colTitles, rowTitles, answerIds)}
      />
    );
  }
}

ObservationsTable.propTypes = {
  answers: PropTypes.object,
  answerIds: PropTypes.array,
  colTitles: PropTypes.array,
  rowTitles: PropTypes.array,
};

export default ObservationsTable;
