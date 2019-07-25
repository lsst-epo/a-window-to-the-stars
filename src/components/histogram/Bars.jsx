import React from 'react';
import PropTypes from 'prop-types';
import Bar from './Bar.jsx';

class Bars extends React.PureComponent {
  isMatch(testData, data) {
    return testData
      ? testData.x0 === data.x0 && testData.x1 === data.x1
      : false;
  }

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

          return (
            <Bar
              key={key}
              x={xScale(d.x0)}
              y={yScale(d.length) + offsetTop}
              width={xScale(d.x1) - xScale(d.x0)}
              height={yScale(0) - yScale(d.length)}
              classes={barClasses}
              selected={this.isMatch(selectedData, d)}
              hovered={this.isMatch(hoveredData, d)}
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
