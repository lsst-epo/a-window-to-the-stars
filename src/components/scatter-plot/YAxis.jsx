import React from 'react';
import PropTypes from 'prop-types';
import { select as d3Select } from 'd3-selection';
import { axisLeft as d3AxisLeft } from 'd3-axis';
import { scaleLog as d3ScaleLog } from 'd3-scale';

class YAxis extends React.Component {
  constructor(props) {
    super(props);
    this.yAxisContainer = React.createRef();
  }

  componentDidMount() {
    const { height, padding } = this.props;
    const yScale = d3ScaleLog()
      .domain([0.001, 100000])
      .range([height - padding, 0]);
    const yAxis = d3AxisLeft(yScale).ticks(8);
    const $yAxis = d3Select(this.yAxisContainer.current);

    $yAxis
      .call(yAxis)
      .selectAll('.tick text')
      .text(d => {
        return Math.log10(d) === 0 ? 1 : 10;
      })
      .append('tspan')
      .attr('baseline-shift', 'super')
      .text(d => {
        const exponent = Math.log10(d);
        return exponent === 0 ? '' : exponent;
      });
  }

  render() {
    const { height, padding, label } = this.props;

    return (
      <React.Fragment>
        <g
          key="y-axis"
          className="y-axis axis"
          transform={`translate(${padding}, 0)`}
          ref={this.yAxisContainer}
        />
        <text
          key="y-axis-label"
          className="y-axis-label"
          transform={`translate(0,
           ${(height - padding) / 2}) rotate(-90)`}
          style={{ textAnchor: 'middle' }}
        >
          {label}
          <tspan baselineShift="sub">&#x2299;</tspan>
        </text>
      </React.Fragment>
    );
  }
}

YAxis.propTypes = {
  label: PropTypes.string,
  height: PropTypes.number,
  padding: PropTypes.number,
};

export default YAxis;
