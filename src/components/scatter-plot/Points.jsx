import React from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';
import Point from './Point.jsx';

class Points extends React.PureComponent {
  render() {
    const {
      data,
      selectedData,
      hoveredData,
      xScale,
      yScale,
      xValueAccessor,
      yValueAccessor,
    } = this.props;

    return (
      <g className="data-points">
        {data.map((d, i) => {
          const { source_id: id } = d;
          const key = `point-${id}-${i}`;
          const selected = includes(selectedData, d);
          const hovered = includes(hoveredData, d);

          return (
            <Point
              key={key}
              sourceId={id}
              x={xScale(d[xValueAccessor])}
              y={yScale(d[yValueAccessor])}
              selected={selected}
              hovered={hovered}
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
  hoveredData: PropTypes.bool,
  xValueAccessor: PropTypes.string,
  yValueAccessor: PropTypes.string,
  xScale: PropTypes.string,
  yScale: PropTypes.string,
};

export default Points;
