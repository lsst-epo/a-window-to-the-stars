import React from 'react';
import PropTypes from 'prop-types';
// import includes from 'lodash/includes';
import Point from './Point.jsx';

class Points extends React.PureComponent {
  checkId(data, id) {
    if (!data) return false;
    let selected = false;
    let i = 0;

    while (i < data.length) {
      if (id === data[i].source_id) {
        selected = true;
        i = data.length;
      }

      i += 1;
    }
    return selected;
  }

  render() {
    const {
      selectedData,
      filterBy,
      data,
      xScale,
      yScale,
      xValueAccessor,
      yValueAccessor,
    } = this.props;

    return (
      <g className="data-points">
        {data.map((d, i) => {
          if (filterBy && !d[filterBy]) {
            return null;
          }
          const { source_id: id } = d;
          const key = `point-${id}-${i}`;
          const selected = this.checkId(selectedData, id);

          return (
            <Point
              key={key}
              x={xScale(d[xValueAccessor])}
              y={yScale(d[yValueAccessor])}
              selected={selected}
              tabIndex="0"
            />
          );
        })}
      </g>
    );
  }
}

Points.propTypes = {
  data: PropTypes.array,
  selectedData: PropTypes.bool,
  filterBy: PropTypes.string,
  xValueAccessor: PropTypes.string,
  yValueAccessor: PropTypes.string,
  xScale: PropTypes.string,
  yScale: PropTypes.string,
};

export default Points;
