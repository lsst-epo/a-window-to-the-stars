import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import { select as d3Select, event as d3Event } from 'd3-selection';
import {
  histogram as d3Histogram,
  max as d3Max,
  thresholdSturges as d3ThresholdSturges,
} from 'd3-array';
import {
  scalePoint as d3ScaleBand,
  scaleLinear as d3ScaleLinear,
} from 'd3-scale';
import 'd3-transition';
import CircularProgress from 'react-md/lib//Progress/CircularProgress';
import XAxis from './XAxis.jsx';
import YAxis from './YAxis.jsx';
import Bars from './Bars.jsx';
import Tooltip from './Tooltip.jsx';

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
      selectedData: null,
      hoverDataBar: null,
      tooltipPosX: 0,
      tooltipPosY: 0,
      showTooltip: false,
      xScale: undefined,
      yScale: undefined,
      loading: true,
    };

    this.svgEl = React.createRef();
  }

  componentDidMount() {
    const {
      data,
      valueAccessor,
      width,
      height,
      padding,
      offsetTop,
      offsetRight,
    } = this.props;

    const histData = this.histogramData(data, valueAccessor);
    const xScale = this.getXScale(histData, width, padding, offsetRight);
    const yScale = this.getYScale(histData, height, padding, offsetTop);

    this.setState(
      prevState => ({
        ...prevState,
        data: histData,
        xScale,
        yScale,
      }),
      this.updateHistogram
    );
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (prevProps.data !== data && !isEmpty(data)) {
      this.updateHistogram();
    }
  }

  getXScale(data, width, padding, offsetRight) {
    const last = data[data.length - 1];
    const newDomain = data.map(d => {
      return d.x0;
    });

    newDomain.push(last.x1);

    return d3ScaleBand()
      .domain(newDomain)
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

  clearGraph() {
    this.setState(prevState => ({
      ...prevState,
      hoveredData: null,
      showTooltip: false,
      selectedData: null,
      // showLasso: false,
    }));
  }

  toggleSelection(d) {
    const { dataSelectionCallback } = this.props;
    const { selectedData } = this.state;

    const newState = {
      tooltipPosX: d3Event.clientX,
      tooltipPosY: d3Event.clientY,
      showTooltip: true,
      selectedData: d,
    };

    if (d === selectedData) {
      newState.selectedData = null;
      newState.showTooltip = false;
    }

    this.setState(prevState => ({
      ...prevState,
      ...newState,
    }));

    dataSelectionCallback(d);
  }

  // mouseover/focus handler for point
  onMouseOver = d => {
    // add hover style on point and show tooltip
    this.setState(prevState => ({
      ...prevState,
      hoveredData: d,
      tooltipPosX: d3Event.clientX,
      tooltipPosY: d3Event.clientY,
      showTooltip: true,
    }));
  };

  // mouseout/blur handler for point
  onMouseOut = () => {
    const { selectedData } = this.state;

    // remove hover style on point but don't hide tooltip
    this.setState(prevState => ({
      ...prevState,
      hoveredData: null,
      showTooltip: !!selectedData,
    }));
  };

  // add event listeners to Histogram and Bars
  addEventListeners() {
    const $histogram = d3Select(this.svgEl.current);
    const $bars = d3Select(this.svgEl.current).selectAll('.data-bar');

    $histogram.on('click', () => {
      // remove styles and selections when click on non-bar
      const barData = d3Select(d3Event.target).datum();

      if (barData) {
        this.toggleSelection(barData);
      } else {
        this.clearGraph();
      }
    });

    // add event listeners to bars
    $bars.on('mouseover', this.onMouseOver).on('mouseout', this.onMouseOut);
  }

  updateBars() {
    const { data, loading } = this.state;
    const { preselected, multiple } = this.props;
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

  updateHistogram() {
    const { preSelected } = this.props;
    this.updateBars();

    if (!preSelected) this.addEventListeners();
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

    const {
      data,
      hoveredData,
      selectedData,
      xScale,
      yScale,
      loading,
      showTooltip,
      tooltipPosY,
      tooltipPosX,
    } = this.state;

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
        <Tooltip
          key="tooltip"
          barData={selectedData || hoveredData}
          posX={tooltipPosX}
          posY={tooltipPosY}
          show={showTooltip}
          valueAccessor={valueAccessor}
        />
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
              selectedData={selectedData}
              hoveredData={hoveredData}
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
  selectedData: PropTypes.array,
  dataSelectionCallback: PropTypes.func,
  stateKey: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
  offsetRight: PropTypes.number,
  offsetTop: PropTypes.number,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  valueAccessor: PropTypes.string,
  preSelected: PropTypes.bool,
  multiple: PropTypes.bool,
};

export default Histogram;
