import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { select as d3Select, event as d3Event } from 'd3-selection';
import { scaleLog as d3ScaleLog, scaleLinear as d3ScaleLinear } from 'd3-scale';
import 'd3-transition';
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
    useLasso: false,
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
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedData } = this.state;
    const { data, dataSelectionCallback, activeId } = this.props;
    const differentSelectedData = selectedData !== prevState.selectedData;
    const shouldCallback = dataSelectionCallback && differentSelectedData;

    if (prevProps.data !== data) {
      this.updateScatterPlot();
    }

    if (prevProps.activeId !== activeId) {
      this.clearGraph();
    }

    if (shouldCallback) {
      dataSelectionCallback(selectedData);
    }
  }

  arrayify(data) {
    return isEmpty(data) ? null : [].concat(data);
  }

  getSelectedId(selectedData) {
    if (!selectedData) return null;
    if (selectedData.length === 1) return selectedData.source_id;

    return null;
  }

  clearGraph() {
    this.setState(prevState => ({
      ...prevState,
      hoverPointData: null,
      showTooltip: false,
      selectedData: null,
      showLasso: false,
    }));
  }

  toggleSelection(d) {
    const { selectedData } = this.state;
    const selectedPointId = this.getSelectedId(selectedData);

    const newState = {
      toolTipPosX: d3Event.clientX,
      toolTipPosY: d3Event.clientY,
      showLasso: false,
      showTooltip: true,
      selectedData: this.arrayify(d),
    };

    if (d.source_id === selectedPointId) {
      newState.selectedData = null;
      newState.showTooltip = false;
    }

    this.setState(prevState => ({
      ...prevState,
      ...newState,
    }));
  }

  // mouseover/focus handler for point
  onMouseOver = d => {
    // add hover style on point and show tooltip
    this.setState(prevState => ({
      ...prevState,
      hoverPointData: this.arrayify(d),
      toolTipPosX: d3Event.clientX,
      toolTipPosY: d3Event.clientY,
      showTooltip: true,
    }));
  };

  // mouseout/blur handler for point
  onMouseOut = () => {
    const { selectedData } = this.state;

    // remove hover style on point but don't hide tooltip
    this.setState(prevState => ({
      ...prevState,
      hoverPointData: null,
      showTooltip: !!selectedData,
    }));
  };

  onDragStart = () => {
    // console.log('start');
  };

  onDrag = () => {
    // console.log('dragging');
    this.setState(prevState => ({
      ...prevState,
      selectedData: null,
      showTooltip: false,
      showLasso: true,
    }));
  };

  onDragEnd = d => {
    // console.log('end');
    this.setState(prevState => ({
      ...prevState,
      showTooltip: false,
      selectedData: this.arrayify(d),
    }));
  };

  // add event listeners to Scatterplot and Points
  addEventListeners() {
    const $scatterplot = d3Select(this.svgEl.current);
    const $allPoints = d3Select(this.svgEl.current).selectAll('.data-point');

    $scatterplot.on('click', () => {
      // remove styles and selections when click on non-point
      const pointData = d3Select(d3Event.target).datum();
      if (pointData) {
        this.toggleSelection(pointData);
      } else {
        this.clearGraph();
      }
    });
    // add event listeners to points
    $allPoints
      .on('mouseover', this.onMouseOver)
      .on('mouseout', this.onMouseOut);
  }

  getPointsData(data, filterBy) {
    if (filterBy) {
      return data.filter(datum => {
        return !!datum[filterBy];
      });
    }

    return data;
  }

  // add attributes to points
  updatePoints() {
    const { data, filterBy } = this.props;

    if (!data) {
      return;
    }

    d3Select(this.svgEl.current)
      .selectAll('.data-point')
      .data(data)
      .filter(nodeData => {
        return filterBy ? nodeData[filterBy] : true;
      });
  }

  // bind data to elements and add styles and attributes
  updateScatterPlot() {
    const { preSelected } = this.props;
    this.updatePoints();

    if (!preSelected) this.addEventListeners();
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
      xValueAccessor,
      yValueAccessor,
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
            {data && (
              <Points
                data={this.getPointsData(data, filterBy)}
                selectedData={selectedData}
                hoveredData={hoverPointData}
                filterBy={filterBy}
                xScale={xScale}
                yScale={yScale}
                xValueAccessor={xValueAccessor}
                yValueAccessor={yValueAccessor}
              />
            )}
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
  data: PropTypes.array,
  activeId: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
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
  dataSelectionCallback: PropTypes.func,
  filterBy: PropTypes.string,
  preSelected: PropTypes.bool,
};

export default ScatterPlot;
