import React from 'react';
import PropTypes from 'prop-types';
import { select as d3Select, event as d3Event } from 'd3-selection';
import { easeCircle as d3EaseCircle } from 'd3-ease';
import { scaleLog as d3ScaleLog, scaleLinear as d3ScaleLinear } from 'd3-scale';
import 'd3-transition';
// import { extent as d3Extent } from 'd3-array';
import Points from './Points.jsx';
import XAxis from './XAxis.jsx';
import YAxis from './YAxis.jsx';
import Tooltip from './Tooltip.jsx';
import Lasso from './Lasso.jsx';

class ScatterPlot extends React.PureComponent {
  static defaultProps = {
    width: 600,
    height: 600,
    padding: 70,
    offsetTop: 7,
    offsetRight: 7,
    xDomain: [14000, 3000],
    yDomain: [0.01, 10000],
  };

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
      xScale: d3ScaleLinear()
        .domain(props.xDomain)
        .range([props.padding, props.width - props.offsetRight]),
      yScale: d3ScaleLog()
        .domain(props.yDomain)
        .range([props.height - props.padding, props.offsetTop]),
    };

    this.svgEl = React.createRef();
  }

  componentDidMount() {
    this.updateScatterPlot();
    // console.log('component did mount');
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedData, hoverPointData } = this.state;
    const { data, dataSelectionCallback, clearOnChange } = this.props;
    const differentSelectedData = selectedData !== prevState.selectedData;
    const shouldCallback = dataSelectionCallback && differentSelectedData;

    // console.log('component did update');
    if (prevProps.data !== data) {
      this.updateScatterPlot();
    }
    // else {
    //   this.updatePoints();
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
      toolTipPosX: d3Event.clientX,
      toolTipPosY: d3Event.clientY,
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

    const newState = {
      toolTipPosX: d3Event.clientX,
      toolTipPosY: d3Event.clientY,
      showLasso: false,
      showTooltip: true,
      selectedData: d,
    };

    if (d.id === selectedPointId) {
      newState.selectedData = null;
      newState.showTooltip = false;
    }

    this.setState(prevState => ({
      ...prevState,
      ...newState,
    }));
  };

  onDragStart = () => {
    this.setState(
      prevState => ({
        ...prevState,
        selectedData: [],
        showLasso: false,
      }),
      () => {
        // console.log('start');
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

        // console.log('end');
        dataLassoCallback(selectedData);
      }
    );
  };

  // add event listeners to Scatterplot and Points
  addEventListeners() {
    const $scatterplot = d3Select(this.svgEl.current);
    const $allPoints = d3Select(this.svgEl.current).selectAll('.data-point');

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
      .on('mouseover', this.onMouseOver)
      .on('mouseout', this.onMouseOut)
      .on('click', this.onClick);
  }

  // add attributes to points
  updatePoints() {
    const { data, xValueAccessor, yValueAccessor, filterBy } = this.props;
    const { xScale, yScale } = this.state;

    if (!data) {
      return;
    }

    const $allPoints = d3Select(this.svgEl.current)
      .selectAll('.data-point')
      .data(data)
      .filter(nodeData => {
        return filterBy ? nodeData[filterBy] : true;
      });

    $allPoints
      .attr('cx', d => {
        return xScale(d[xValueAccessor]);
      })
      .attr('cy', d => {
        return yScale(d[yValueAccessor]);
      })
      .transition()
      .duration(1000)
      .ease(d3EaseCircle)
      .attr('r', 6)
      .attr('stroke', 'black')
      .attr('fill', 'yellow');
  }

  // bind data to elements and add styles and attributes
  updateScatterPlot() {
    this.updatePoints();
    this.addEventListeners();
  }

  render() {
    const {
      data,
      width,
      height,
      padding,
      offsetTop,
      offsetRight,
      xAxisLabel,
      yAxisLabel,
      useLasso,
      filterBy,
    } = this.props;

    const {
      hoverPointData,
      toolTipPosX,
      toolTipPosY,
      showTooltip,
      selectedData,
      showLasso,
      xScale,
      yScale,
    } = this.state;

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
            <Points
              data={data}
              selectedData={selectedData}
              hoveredData={hoverPointData}
              filterBy={filterBy}
            />
            <XAxis
              label={xAxisLabel}
              height={height}
              width={width}
              padding={padding}
              offsetTop={offsetTop}
              offsetRight={offsetRight}
              scale={xScale}
            />
            <YAxis
              label={yAxisLabel}
              height={height}
              padding={padding}
              offsetTop={offsetTop}
              scale={yScale}
            />
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
  data: PropTypes.array,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  xValueAccessor: PropTypes.string,
  yValueAccessor: PropTypes.string,
  xDomain: PropTypes.array,
  yDomain: PropTypes.array,
  padding: PropTypes.number,
  offsetTop: PropTypes.number,
  offsetRight: PropTypes.number,
  useLasso: PropTypes.bool,
  dataLassoCallback: PropTypes.func,
  dataSelectionCallback: PropTypes.func,
  clearOnChange: PropTypes.bool,
  filterBy: PropTypes.string,
};

export default ScatterPlot;
