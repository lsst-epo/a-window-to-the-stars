import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import { select as d3Select, event as d3Event } from 'd3-selection';
import { max as d3Max } from 'd3-array';
import {
  scalePoint as d3ScalePoint,
  scaleLinear as d3ScaleLinear,
} from 'd3-scale';
import 'd3-transition';
import CircularProgress from 'react-md/lib//Progress/CircularProgress';
import XAxis from './XAxis.jsx';
import YAxis from './YAxis.jsx';
import Bars from './Bars.jsx';
import Tooltip from '../charts/shared/Tooltip.jsx';

class Histogram extends React.PureComponent {
  static defaultProps = {
    width: 600,
    height: 600,
    padding: 70,
    offsetTop: 7,
    offsetRight: 7,
    yAxisLabel: 'Count',
    tooltipAccessors: ['temperature'],
  };

  constructor(props) {
    super(props);

    this.state = {
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
    const { data } = this.props;

    if (!isEmpty(data)) {
      this.updateHistogram();
    }
  }

  componentDidUpdate() {
    const { data } = this.props;
    const { loading } = this.state;

    if (!isEmpty(data) && loading) {
      this.updateHistogram();
    }
  }

  getXScale(data, valueAccessor, width, padding, offsetRight) {
    if (valueAccessor === 'luminosity') {
      const last = data[data.length - 1];
      const domain = data.map(d => {
        return d.x0;
      });

      domain.push(last.x1);
      return d3ScalePoint()
        .domain(domain)
        .range([padding, width - offsetRight]);
    }

    const last = data[data.length - 1];
    const domain = data.map(d => {
      return d.x0;
    });

    domain.push(last.x1);

    return d3ScalePoint()
      .domain(domain)
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
    const { loading } = this.state;
    const { data } = this.props;
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
      data,
      width,
      height,
      padding,
      xAxisLabel,
      yAxisLabel,
      offsetTop,
      offsetRight,
      valueAccessor,
      tooltipAccessors,
    } = this.props;

    const {
      hoveredData,
      selectedData,
      loading,
      showTooltip,
      tooltipPosY,
      tooltipPosX,
    } = this.state;

    const xScale = this.getXScale(
      data,
      valueAccessor,
      width,
      padding,
      offsetRight
    );
    const yScale = this.getYScale(data, height, padding, offsetTop);

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
          data={selectedData || hoveredData}
          posX={tooltipPosX}
          posY={tooltipPosY}
          show={showTooltip}
          accessors={tooltipAccessors}
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
              valueAccessor={valueAccessor}
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
              valueAccessor={valueAccessor}
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
  // selectedData: PropTypes.array,
  dataSelectionCallback: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
  offsetRight: PropTypes.number,
  offsetTop: PropTypes.number,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  valueAccessor: PropTypes.string,
  preSelected: PropTypes.bool,
  tooltipAccessors: PropTypes.array,
  // multiple: PropTypes.bool,
};

export default Histogram;
