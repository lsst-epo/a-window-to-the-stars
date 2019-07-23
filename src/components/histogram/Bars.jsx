import React from 'react';
import PropTypes from 'prop-types';
import Bar from './Bar.jsx';

class Bars extends React.PureComponent {
  render() {
    const {
      data,
      selectedData,
      hoveredData,
      xScale,
      yScale,
      offsetTop,
      barClasses,
    } = this.props;

    return (
      <g className="data-bars">
        {data.map((d, i) => {
          const key = `bar-${i}`;
          const selected = selectedData === d;
          const hovered = hoveredData === d;

          return (
            <Bar
              key={key}
              x={xScale(d.x0)}
              y={yScale(d.length) + offsetTop}
              width={xScale(d.x1) - xScale(d.x0)}
              height={yScale(0) - yScale(d.length)}
              classes={barClasses}
              selected={selected}
              hovered={hovered}
            />
          );
        })}
      </g>
    );
  }
}

Bars.propTypes = {
  data: PropTypes.array,
  selectedData: PropTypes.bool,
  hoveredData: PropTypes.bool,
  offsetTop: PropTypes.number,
  xScale: PropTypes.string,
  yScale: PropTypes.string,
  barClasses: PropTypes.string,
};

export default Bars;
