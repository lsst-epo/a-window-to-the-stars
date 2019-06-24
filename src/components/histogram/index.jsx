import React from 'react';
import PropTypes from 'prop-types';
import { select as d3Select } from 'd3-selection';
import { easeCircle as d3EaseCircle } from 'd3-ease';
import { axisBottom as d3AxisBottom, axisLeft as d3AxisLeft } from 'd3-axis';
import { format as d3Format } from 'd3-format';
import {
  histogram as d3Histogram,
  max as d3Max,
  thresholdFreedmanDiaconis as d3ThresholdFreedmanDiaconis,
} from 'd3-array';
import {
  scaleBand as d3ScaleBand,
  scaleLinear as d3ScaleLinear,
} from 'd3-scale';
import 'd3-transition';
import API from '../site/API';

class Histogram extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };

    this.svgEl = React.createRef();
    this.xAxisContainer = React.createRef();
    this.yAxisContainer = React.createRef();
  }

  componentDidMount() {
    const { dataPath } = this.props;

    API.get(dataPath).then(res => {
      this.setState(prevState => ({
        ...prevState,
        data: this.histogramData(res.data),
      }));
    });
  }

  componentDidUpdate() {
    this.updateHistogram();
  }

  // Update data point styles and attributes
  updateRects($selection, xScale, yScale) {
    const { data } = this.state;

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
      .ease(d3EaseCircle)
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
    const xAxis = d3AxisBottom(xScale).tickFormat(d3Format('.1f'));
    d3Select(this.xAxisContainer.current).call(xAxis);
  }

  // Update Y Axis
  updateYAxis(yScale) {
    const yAxis = d3AxisLeft(yScale);

    d3Select(this.yAxisContainer.current).call(yAxis);
  }

  histogramData(data) {
    const { valueAccessor } = this.props;

    return d3Histogram()
      .value(d => {
        return d[valueAccessor]; // eslint-disable-line dot-notation
      })
      .thresholds(d3ThresholdFreedmanDiaconis)(data)
      .reduce((result, d) => {
        if (d.length !== 0) {
          result.push(d);
        }
        return result;
      }, []);
  }

  updateHistogram() {
    const { width, height, padding } = this.props;
    const { data } = this.state;
    const $selection = d3Select(this.svgEl.current);

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

    const xScale = d3ScaleBand()
      .domain(
        data.map(d => {
          return d.x0;
        })
      )
      .range([padding, width - padding]);

    const yScale = d3ScaleLinear()
      .domain([
        0,
        d3Max(data, d => {
          return d.length;
        }),
      ])
      .range([height - padding, padding]);

    this.updateRects($selection, xScale, yScale);
    this.updateXAxis(xScale);
    this.updateYAxis(yScale);
  }

  bars() {
    const { valueAccessor } = this.props;
    const { data } = this.state;

    return data.map((d, i) => {
      const key = `${valueAccessor}-rect-${i}`;
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

    return (
      <div>
        <svg
          className="histogram-container"
          width={width}
          height={height}
          ref={this.svgEl}
        >
          <g className="bars">{this.bars()}</g>
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
            style={{ textAnchor: 'middle' }}
          >
            {xAxisLabel}
          </text>
          <text
            className="y-axis-label"
            transform={`translate(${padding / 3}, ${height / 2}) rotate(-90)`}
            style={{ textAnchor: 'middle' }}
          >
            {yAxisLabel}
          </text>
        </svg>
      </div>
    );
  }
}

Histogram.propTypes = {
  dataPath: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  valueAccessor: PropTypes.string,
};

export default Histogram;
