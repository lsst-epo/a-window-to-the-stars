import React from 'react';
import PropTypes from 'prop-types';
import { select as d3Select } from 'd3-selection';
import { axisBottom as d3AxisBottom } from 'd3-axis';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';

class XAxis extends React.Component {
  constructor(props) {
    super(props);
    this.xAxisContainer = React.createRef();
  }

  componentDidMount() {
    const { width, padding } = this.props;
    const xScale = d3ScaleLinear()
      .domain([10000, 3000])
      .range([padding, width]);
    const xAxis = d3AxisBottom(xScale);
    d3Select(this.xAxisContainer.current).call(xAxis);
  }

  render() {
    const { height, width, padding, label } = this.props;

    return (
      <React.Fragment>
        <g
          key="x-axis"
          className="x-axis axis"
          transform={`translate(0, ${height - padding})`}
          ref={this.xAxisContainer}
        />
        <text
          key="x-axis-label"
          className="x-axis-label"
          transform={`translate(${(width + padding) / 2},
           ${height})`}
          style={{ textAnchor: 'middle' }}
        >
          {label}
        </text>
      </React.Fragment>
    );
  }
}

XAxis.propTypes = {
  label: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  padding: PropTypes.number,
};

export default XAxis;
