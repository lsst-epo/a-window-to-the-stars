import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import { select as d3Select } from 'd3-selection';
import {
  histogram as d3Histogram,
  max as d3Max,
  thresholdSturges as d3ThresholdSturges,
} from 'd3-array';
import {
  scaleBand as d3ScaleBand,
  scaleLinear as d3ScaleLinear,
} from 'd3-scale';
import 'd3-transition';
import CircularProgress from 'react-md/lib//Progress/CircularProgress';
import XAxis from './XAxis.jsx';
import YAxis from './YAxis.jsx';
import Bars from './Bars.jsx';

class Histogram extends React.Component {
  static defaultProps = {
    width: 600,
    height: 600,
    padding: 70,
    offsetTop: 7,
    offsetRight: 7,
    yAxisLabel: 'Count',
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      xScale: undefined,
      yScale: undefined,
      loading: true,
    };

    this.svgEl = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const {
      data,
      valueAccessor,
      width,
      height,
      padding,
      offsetTop,
      offsetRight,
    } = this.props;

    if (prevProps.data !== data && !isEmpty(data)) {
      const histData = this.histogramData(data, valueAccessor);
      const xScale = this.getXScale(histData, width, padding, offsetRight);
      const yScale = this.getYScale(histData, height, padding, offsetTop);
      /* eslint-disable react/no-did-update-set-state */
      this.setState(
        prevState => ({
          ...prevState,
          data: histData,
          xScale,
          yScale,
        }),
        this.updateHistogram
      );
      /* eslint-disable react/no-did-update-set-state */
    }
  }

  getXScale(data, width, padding, offsetRight) {
    return d3ScaleBand()
      .domain(
        data.map(d => {
          return d.x0;
        })
      )
      .range([padding, width - offsetRight]);
  }

  getYScale(data, height, padding, offsetTop) {
    return d3ScaleLinear()
      .domain([
        0,
        d3Max(data, d => {
          return d.length;
        }),
      ])
      .range([height - padding, offsetTop]);
  }

  histogramData(data, valueAccessor) {
    return d3Histogram()
      .value(d => {
        return d[valueAccessor]; // eslint-disable-line dot-notation
      })
      .thresholds(d3ThresholdSturges)(data);
  }

  updateHistogram() {
    const { data, loading } = this.state;
    const $histogram = d3Select(this.svgEl.current);

    $histogram
      .selectAll('.data-bar')
      .data(data)
      .transition()
      .end()
      .then(() => {
        if (loading) {
          this.setState(prevState => ({
            ...prevState,
            loading: false,
          }));
        }
      });
  }

  bars() {
    const { valueAccessor } = this.props;
    const { data } = this.state;

    return data.map((d, i) => {
      const key = `${valueAccessor}-rect-${i}`;
      return (
        <rect
          className="rect data-bar"
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
    const {
      width,
      height,
      padding,
      xAxisLabel,
      yAxisLabel,
      offsetTop,
      offsetRight,
      valueAccessor,
    } = this.props;

    const { data, xScale, yScale, loading } = this.state;

    const svgClasses = classnames('histogram svg-chart', {
      loading,
      loaded: !loading,
    });

    return (
      <div className="svg-container histogram-container">
        {loading && (
          <CircularProgress
            className="chart-loader"
            scale={3}
            value={loading}
          />
        )}
        <svg
          key={valueAccessor}
          className={svgClasses}
          preserveAspectRatio="xMidYMid meet"
          viewBox={`0 0 ${width} ${height}`}
          ref={this.svgEl}
        >
          {xScale && yScale && (
            <Bars
              data={data}
              offsetTop={offsetTop}
              xScale={xScale}
              yScale={yScale}
            />
          )}
          {xScale && (
            <XAxis
              label={xAxisLabel}
              height={height}
              width={width}
              padding={padding}
              offsetTop={offsetTop}
              offsetRight={offsetRight}
              scale={xScale}
            />
          )}
          {yScale && (
            <YAxis
              label={yAxisLabel}
              height={height}
              padding={padding}
              offsetTop={offsetTop}
              scale={yScale}
            />
          )}
        </svg>
      </div>
    );
  }
}

Histogram.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
  offsetRight: PropTypes.number,
  offsetTop: PropTypes.number,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  valueAccessor: PropTypes.string,
};

export default Histogram;
