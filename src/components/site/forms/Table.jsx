import React from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-md/lib//DataTables/DataTable';
import TableHeader from 'react-md/lib//DataTables/TableHeader';
import TableBody from 'react-md/lib//DataTables/TableBody';
import TableRow from 'react-md/lib//DataTables/TableRow';
import TableColumn from 'react-md/lib//DataTables/TableColumn';

class Table extends React.PureComponent {
  render() {
    const { colTitles, rowTitles, rows } = this.props;

    return (
      <DataTable plain fullWidth>
        {colTitles && (
          <TableHeader>
            <TableRow>
              {colTitles.map(title => {
                return (
                  <TableColumn key={`col-title-${title}`}>{title}</TableColumn>
                );
              })}
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {/* eslint-disable react/no-array-index-key */}
          {rows.map((row, i) => (
            <TableRow key={`row-${i}`}>
              {row.map((col, j) => {
                if (rowTitles && j === 0) {
                  return (
                    <TableColumn key={`col-${j}`} className="row-title">
                      {col}
                    </TableColumn>
                  );
                }

                return <TableColumn key={`col-${j}`}>{col}</TableColumn>;
              })}
            </TableRow>
          ))}
          {/* eslint-enable react/no-array-index-key */}
        </TableBody>
      </DataTable>
    );
  }
}

Table.propTypes = {
  colTitles: PropTypes.array,
  rows: PropTypes.array,
  rowTitles: PropTypes.bool,
};

export default Table;
