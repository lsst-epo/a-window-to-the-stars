import React from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';
import { select as d3Select, event as d3Event } from 'd3-selection';
import { easeCircle as d3EaseCircle } from 'd3-ease';
import { scaleLog as d3ScaleLog, scaleLinear as d3ScaleLinear } from 'd3-scale';
import 'd3-transition';
import Point from './Point.jsx';
import XAxis from './XAxis.jsx';
import YAxis from './YAxis.jsx';
import Tooltip from './Tooltip.jsx';
import Lasso from './Lasso.jsx';

class ScatterPlot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedData: null,
      hoverPointData: null,
      showLasso: false,
      dragLine: [],
      dragLoop: [],
      toolTipPosX: 0,
      toolTipPosY: 0,
      showTooltip: false,
    };

    // refs to attach d3 events, transitions, data bindings, etc.
    this.svgEl = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedData, hoverPointData } = this.state;
    const { data, dataSelectionCallback, clearOnChange } = this.props;
    const differentSelectedData = selectedData !== prevState.selectedData;
    const shouldCallback = dataSelectionCallback && differentSelectedData;

    if (prevProps.data !== data) {
      this.createScatterPlot();
    }
    //  else {
    //   console.log('updating');
    //   this.updateScatterPlot();
    // }

    if (shouldCallback) {
      dataSelectionCallback(selectedData);
    }

    /* eslint-disable react/no-did-update-set-state */
    if (clearOnChange !== prevProps.clearOnChange && !hoverPointData) {
      this.setState(currentState => ({
        ...currentState,
        hoverPointData: null,
        toolTipPosX: 0,
        toolTipPosY: 0,
        showTooltip: false,
        selectedData: null,
      }));
    }
    /* eslint-enable react/no-did-update-set-state */
  }

  // mouseover/focus handler for point
  onMouseOver = d => {
    // add hover style on point and show tooltip
    this.setState(prevState => ({
      ...prevState,
      hoverPointData: d,
      toolTipPosX: d3Event.pageX,
      toolTipPosY: d3Event.pageY,
      showTooltip: true,
    }));
  };

  // mouseout/blur handler for point
  onMouseOut = () => {
    const { selectedData } = this.state;
    const selectedPointId =
      selectedData && !Array.isArray(selectedData) ? selectedData.id : null;

    // remove hover style on point but don't hide tooltip
    if (selectedPointId) {
      this.setState(prevState => ({
        ...prevState,
        hoverPointData: null,
      }));
      // remove hover style on point and hide tooltip
    } else {
      this.setState(prevState => ({
        ...prevState,
        hoverPointData: null,
        showTooltip: false,
      }));
    }
  };

  // point click handler
  onClick = d => {
    const { selectedData } = this.state;
    const selectedPointId =
      selectedData && !Array.isArray(selectedData) ? selectedData.id : null;

    // remove selected style on point
    if (d.id === selectedPointId) {
      this.setState(prevState => ({
        ...prevState,
        toolTipPosX: d3Event.pageX,
        toolTipPosY: d3Event.pageY,
        selectedData: null,
        showLasso: false,
      }));
      // add selected style on point
    } else {
      this.setState(prevState => ({
        ...prevState,
        toolTipPosX: d3Event.pageX,
        toolTipPosY: d3Event.pageY,
        showTooltip: true,
        selectedData: d,
        showLasso: false,
      }));
    }
  };

  onDragStart = () => {
    this.setState(
      prevState => ({
        ...prevState,
        selectedData: [],
        showLasso: false,
      }),
      () => {
        console.log('start');
      }
    );
  };

  onDrag = () => {
    this.setState(
      prevState => ({
        ...prevState,
        showTooltip: false,
        showLasso: true,
      }),
      () => {
        // console.log('dragging');
      }
    );
  };

  onDragEnd = d => {
    const { dataLassoCallback } = this.props;

    this.setState(
      prevState => ({
        ...prevState,
        showTooltip: false,
        selectedData: d,
      }),
      () => {
        const { selectedData } = this.state;

        console.log('end');
        dataLassoCallback(selectedData);
      }
    );
  };

  // add event listeners to Scatterplot and Points
  addEventListeners() {
    const $scatterplot = d3Select(this.svgEl.current);
    const $allPoints = d3Select(this.svgEl.current).selectAll('rect');

    $scatterplot.on('click', () => {
      // remove styles and selections when click on non-point
      if (d3Event.target.classList[0] !== 'data-point') {
        this.setState(prevState => ({
          ...prevState,
          hoverPointData: null,
          showTooltip: false,
          selectedData: null,
        }));
      }
    });

    // add event listeners to points
    $allPoints
      .on('mouseover focus', this.onMouseOver)
      .on('mouseout blur', this.onMouseOut)
      .on('click', this.onClick);
  }

  // render Point components
  points() {
    const { selectedData, hoverPointData } = this.state;
    let { data } = this.props;

    if (!data) {
      return null;
    }

    if (!Array.isArray(data)) {
      data = [data];
    }

    return data.map((d, i) => {
      const key = `$rect-${i}`;
      const selected = d === selectedData || includes(selectedData, d);
      const hovered = d === hoverPointData;

      return (
        <Point
          key={key}
          data={d}
          selected={selected}
          hovered={hovered}
          tabIndex="0"
        />
      );
    });
  }

  // add attributes to points
  updatePoints(xScale, yScale) {
    const { data, xValueAccessor, yValueAccessor } = this.props;
    const $allPoints = d3Select(this.svgEl.current)
      .selectAll('rect')
      .data(data);

    $allPoints
      .attr('x', d => {
        return xScale(d[xValueAccessor]);
      })
      .attr('y', d => {
        return yScale(d[yValueAccessor]);
      })
      .transition()
      .duration(1000)
      .ease(d3EaseCircle)
      .attr('rx', 6)
      .attr('fill', 'yellow')
      .attr('stroke', 'black')
      .attr('width', 12)
      .attr('height', 12);
  }

  // bind data to elements and add styles and attributes
  createScatterPlot() {
    const { data, width, height, padding } = this.props;

    const xScale = d3ScaleLinear()
      .domain([10000, 3000])
      .range([padding, width]);

    const yScale = d3ScaleLog()
      .domain([0.001, 100000])
      .range([height - padding, 0]);

    // this.createXAxis(xScale);
    // this.createYAxis(yScale);
    if (data) {
      this.updatePoints(xScale, yScale);
    }
    this.addEventListeners();
  }

  // re-bind data to elements
  updateScatterPlot() {
    const { data } = this.props;

    d3Select(this.svgEl.current)
      .selectAll('rect')
      .data(data);
  }

  render() {
    const {
      hoverPointData,
      toolTipPosX,
      toolTipPosY,
      showTooltip,
      selectedData,
      showLasso,
    } = this.state;

    const {
      width,
      height,
      padding,
      xAxisLabel,
      yAxisLabel,
      useLasso,
    } = this.props;

    return (
      <div>
        <Tooltip
          key="tooltip"
          pointData={selectedData || hoverPointData}
          posX={toolTipPosX}
          posY={toolTipPosY}
          show={showTooltip}
        />
        <div className="svg-container">
          <svg
            key="scatter-plot"
            className="scatter-plot-svg"
            preserveAspectRatio="xMidYMid meet"
            viewBox={`0 0 ${width} ${height}`}
            ref={this.svgEl}
          >
            <g className="rects">{this.points()}</g>
            <XAxis
              label={xAxisLabel}
              height={height}
              width={width}
              padding={padding}
            />
            <YAxis label={yAxisLabel} height={height} padding={padding} />
            {useLasso && (
              <Lasso
                active={showLasso}
                lassoableEl={this.svgEl}
                dragCallback={this.onDrag}
                dragStartCallback={this.onDragStart}
                dragEndCallback={this.onDragEnd}
              />
            )}
          </svg>
        </div>
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
  data: PropTypes.array,
  xValueAccessor: PropTypes.string,
  yValueAccessor: PropTypes.string,
  useLasso: PropTypes.bool,
  dataLassoCallback: PropTypes.func,
  dataSelectionCallback: PropTypes.func,
  clearOnChange: PropTypes.bool,
};

export default ScatterPlot;
