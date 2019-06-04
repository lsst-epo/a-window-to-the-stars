import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class ScatterPlot extends React.Component {
  constructor(props) {
    super(props);
    // const maxRadius = 40;

    this.state = {
      padding: 80,
    };

    this.svgEl = React.createRef();
  }

  componentDidMount() {
    this.updateScatterPlot();
  }

  // THIS IS BAD: FIGURE OUT ANOTHER WAY TO DO THIS
  componentDidUpdate() {
    // this.updateScatterPlot();
    return false;
  }

  // Create d3 Selection from SVG
  // Bind data to svg elements
  create() {
    const { data } = this.props;
    return d3
      .select(this.svgEl.current)
      .selectAll('circle')
      .data(data);
  }

  // Add data points to d3 Selection
  // Append data-bound elements to svg
  enter(selection) {
    const { padding } = this.state;
    const { width, height } = this.props;

    const xScale = d3
      .scaleLinear()
      .domain([50000, 3000])
      .range([padding, width - padding]);

    const yScale = d3
      .scaleLog()
      .domain([0.001, 100000])
      .range([height - padding, padding]);

    // const max = d3.max(data, function maxTemp(d) {
    //   return d.teff;
    // });

    selection
      .enter()
      .append('circle')
      .attr('cx', function setX(d) {
        return xScale(d.teff);
      })
      .attr('cy', function setY(d) {
        return yScale(d.luminosity);
      })
      .attr('r', 5)
      .attr('fill', 'yellow')
      .attr('stroke', 'black')
      .attr('stroke-width', '1');

    this.createXAxis(selection, xScale);
    this.createYAxis(selection, yScale);
  }

  // Text label for X Axis
  labelXAxis() {
    const { padding } = this.state;
    const { height, width } = this.props;
    d3.select(this.svgEl.current)
      .append('text')
      .classed('x-axis-label', true)
      .attr('transform', `translate(${width / 2}, ${height - padding / 3})`)
      .style('text-anchor', 'middle')
      .text('Temperature (K)');
  }

  // Text label for Y Axis
  labelYAxis() {
    const { padding } = this.state;
    const { height } = this.props;
    d3.select(this.svgEl.current)

      .append('text')
      .classed('y-axis-label', true)
      .attr('transform', `translate(${padding / 3}, ${height / 2}) rotate(-90)`)
      .style('text-anchor', 'middle')
      .text('Luminosity');
  }

  // Create X Axis
  createXAxis(selection, xScale) {
    const { padding } = this.state;
    const { height } = this.props;
    const xAxis = d3.axisBottom(xScale);

    const axisContainer = d3
      .select(this.svgEl.current)
      .append('g')
      .classed('x-axis axis', true)
      .attr('transform', `translate(0, ${height - padding})`);

    axisContainer.call(xAxis);

    this.labelXAxis(selection);
  }

  // Create Y Axis
  createYAxis(selection, yScale) {
    const { padding } = this.state;
    const yAxis = d3.axisLeft(yScale).ticks(8);

    const axisContainer = d3
      .select(this.svgEl.current)
      .append('g')
      .classed('y-axis axis', true)
      .attr('transform', `translate(${padding}, 0)`);

    axisContainer.call(yAxis);

    this.labelYAxis(selection);
  }

  exit(selection) {
    selection.exit().remove();
  }

  updateScatterPlot() {
    // const { data } = this.props;
    // console.log(data);

    const u = this.create();
    this.enter(u);
    // console.log(u);
    this.exit(u);
  }

  render() {
    const { width, height } = this.props;

    return (
      <div>
        <svg width={width} height={height} ref={this.svgEl} />
      </div>
    );
  }
}

ScatterPlot.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.any,
};

export default ScatterPlot;
