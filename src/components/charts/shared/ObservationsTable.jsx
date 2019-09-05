import React from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';
import Table from '../../site/forms/Table';
import ObservationsTableCell from './ObservationsTableCell';

class ObservationsTable extends React.PureComponent {
  getRows(answers, colTitles, rowTitles, cells) {
    const rows = [].concat(rowTitles);

    for (let j = 0; j < rows.length; j += 1) {
      const row = rows[j];

      cells[j].forEach(cell => {
        const { accessor, ids } = cell;

        if (isArray(ids) && accessor) {
          row.push(
            <ObservationsTableCell
              answerRange={[answers[ids[0]], answers[ids[1]]]}
              accessor={accessor}
            />
          );
        } else if (ids && accessor) {
          row.push(
            <ObservationsTableCell answer={answers[ids]} accessor={accessor} />
          );
        } else {
          row.push(cell);
        }
      });
    }

    return rows;
  }

  render() {
    const { answers, cells, colTitles, rowTitles } = this.props;

    return (
      <Table
        className="hrd-observations"
        colTitles={colTitles}
        includeRowTitles
        rows={this.getRows(answers, colTitles, rowTitles, cells)}
      />
    );
  }
}

ObservationsTable.propTypes = {
  answers: PropTypes.object,
  cells: PropTypes.array,
  colTitles: PropTypes.array,
  rowTitles: PropTypes.array,
};

export default ObservationsTable;
