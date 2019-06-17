import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class Histogram extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      histogramData: this.histogramData(),
    };

    this.svgEl = React.createRef();
    this.xAxisContainer = React.createRef();
    this.yAxisContainer = React.createRef();
  }

  componentDidMount() {
    this.updateHistogram();
  }

  componentDidUpdate() {
    this.updateHistogram();
  }

  // Update data point styles and attributes
  updateRects($selection, data, xScale, yScale) {
    $selection
      .selectAll('rect')
      .data(data)
      .attr('x', d => {
        return xScale(d.x0) + 1;
      })
      .attr('y', () => {
        return yScale(0);
      })
      .attr('width', xScale.bandwidth())
      .transition()
      .duration(1000)
      .ease(d3.easeCircle)
      .attr('fill', 'yellow')
      .attr('stroke', 'black')
      .attr('y', d => {
        return yScale(d.length);
      })
      .attr('height', d => {
        return yScale(0) - yScale(d.length);
      });
  }

  // Update X Axis
  updateXAxis(xScale) {
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('.1f'));
    d3.select(this.xAxisContainer.current).call(xAxis);
  }

  // Update Y Axis
  updateYAxis(yScale) {
    const yAxis = d3.axisLeft(yScale);

    d3.select(this.yAxisContainer.current).call(yAxis);
  }

  histogramData() {
    const { data, valueAccessor } = this.props;

    return d3
      .histogram()
      .value(d => {
        return d[valueAccessor]; // eslint-disable-line dot-notation
      })
      .thresholds(d3.thresholdFreedmanDiaconis)(data)
      .reduce((result, d) => {
        if (d.length !== 0) {
          result.push(d);
        }
        return result;
      }, []);
  }

  updateHistogram() {
    const { width, height, padding } = this.props;
    const { histogramData } = this.state;
    const $selection = d3.select(this.svgEl.current);

    // const xScale = d3
    //   .scaleLinear()
    //   .domain(
    //     d3.extent(data, d => {
    //       return d[valueAccessor]; // eslint-disable-line dot-notation
    //     }),
    //   )
    //   .range([padding, width - padding]);
    // const reduced = histogramData.reduce((result, d) => {
    //     // console.log(d.length);
    //   if (d.length !== 0) {
    //     result.push(d.x1);
    //   }
    //   return result;
    // }, []);
    // console.log(reduced);

    const xScale = d3
      .scaleBand()
      .domain(
        histogramData.map(d => {
          return d.x0;
        }),
      )
      .range([padding, width - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(histogramData, d => {
          return d.length;
        }),
      ])
      .range([height - padding, padding]);

    this.updateRects($selection, histogramData, xScale, yScale);
    this.updateXAxis(xScale);
    this.updateYAxis(yScale);
  }

  bars(data) {
    return data.map((d, i) => {
      const key = `rect-${i}`;
      return (
        <rect
          className="rect"
          key={key}
          x={0}
          y={0}
          height={0}
          width={0}
          strokeWidth={1}
          fill="transparent"
          stroke="transparent"
        />
      );
    });
  }

  render() {
    const { width, height, padding, xAxisLabel, yAxisLabel } = this.props;
    const { histogramData } = this.state;

    return (
      <div>
        <svg
          className="histogram-container"
          width={width}
          height={height}
          ref={this.svgEl}
        >
          <g className="bars">{this.bars(histogramData)}</g>
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

Histogram.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  data: PropTypes.any,
  valueAccessor: PropTypes.string,
};

export default Histogram;
