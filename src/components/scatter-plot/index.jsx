import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class ScatterPlot extends React.Component {
  constructor(props) {
    super(props);

    this.svgEl = React.createRef();
    this.xAxisContainer = React.createRef();
    this.yAxisContainer = React.createRef();
  }

  componentDidMount() {
    this.updateScatterPlot();
  }

  componentDidUpdate() {
    this.updateScatterPlot();
  }

  // Update data point styles and attributes
  updateCircles($selection, data, xScale, yScale) {
    $selection
      .selectAll('circle')
      .data(data)
      .transition()
      .duration(1000)
      .ease(d3.easeCircle)
      .attr('cx', function setX(d) {
        return xScale(d.teff);
      })
      .attr('cy', function setY(d) {
        return yScale(d.luminosity);
      })
      .attr('fill', 'yellow')
      .attr('stroke', 'black')
      .attr('r', 6);
  }

  // Update X Axis
  updateXAxis(xScale) {
    const xAxis = d3.axisBottom(xScale);

    d3.select(this.xAxisContainer.current).call(xAxis);
  }

  // Update Y Axis
  updateYAxis(yScale) {
    const yAxis = d3.axisLeft(yScale).ticks(8);

    d3.select(this.yAxisContainer.current).call(yAxis);
  }

  exit(selection) {
    selection.exit().remove();
  }

  updateScatterPlot() {
    const { width, height, padding, data } = this.props;

    const $selection = d3.select(this.svgEl.current);

    const xScale = d3
      .scaleLinear()
      .domain([50000, 3000])
      .range([padding, width - padding]);

    const yScale = d3
      .scaleLog()
      .domain([0.001, 100000])
      .range([height - padding, padding]);

    this.updateCircles($selection, data, xScale, yScale);
    this.updateXAxis(xScale);
    this.updateYAxis(yScale);
  }

  points() {
    const { data } = this.props;
    return data.map((d, i) => {
      const key = `circle-${i}`;
      return (
        <circle
          className="circle"
          key={key}
          cx={0}
          cy={0}
          r={0}
          strokeWidth={1}
          fill="transparent"
          stroke="transparent"
        />
      );
    });
  }

  render() {
    const { width, height, padding, xAxisLabel, yAxisLabel } = this.props;

    return (
      <div>
        <svg
          className="scatter-plot-container"
          width={width}
          height={height}
          ref={this.svgEl}
        >
          {this.points()}
          <g
            className="x-axis axis"
            transform={`translate(0, ${height - padding})`}
            ref={this.xAxisContainer}
          />
          <g
            className="y-axis axis"
            transform={`translate(${padding}, 0)`}
            ref={this.yAxisContainer}
          />
          <text
            className="x-axis-label"
            transform={`translate(${width / 2}, ${height - padding / 3})`}
            style={{ textAnchor: 'middle', }}
          >
            {xAxisLabel}
          </text>
          <text
            className="y-axis-label"
            transform={`translate(${padding / 3}, ${height / 2}) rotate(-90)`}
            style={{ textAnchor: 'middle', }}
          >
            {yAxisLabel}
          </text>
        </svg>
      </div>
    );
  }
}

ScatterPlot.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  data: PropTypes.any,
};

export default ScatterPlot;
