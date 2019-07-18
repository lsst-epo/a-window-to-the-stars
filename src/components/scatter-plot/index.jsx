import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import { select as d3Select, event as d3Event } from 'd3-selection';
import { scaleLog as d3ScaleLog, scaleLinear as d3ScaleLinear } from 'd3-scale';
import 'd3-transition';
import Card from 'react-md/lib/Cards/Card';
import CircularProgress from 'react-md/lib//Progress/CircularProgress';
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
      loading: true,
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
    const { data, dataSelectionCallback } = this.props;
    const differentSelectedData = selectedData !== prevState.selectedData;
    const shouldCallback = dataSelectionCallback && differentSelectedData;

    if (prevProps.data !== data) {
      this.updateScatterPlot();
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

  // bind data to points
  updatePoints() {
    const { data, preSelected, multiple } = this.props;
    const { loading } = this.state;

    // if (!data) {
    //   return;
    // }

    if (isEmpty(data) && preSelected && loading) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
      }));
    } else if (multiple) {
      data.forEach((selection, i) => {
        if (i === data.length - 1) {
          d3Select(this.svgEl.current)
            .selectAll(`.data-point.${selection.className}`)
            .data(selection.data)
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
        } else {
          d3Select(this.svgEl.current)
            .selectAll(`.data-point${selection.className}`)
            .data(selection.data);
        }
      });
    } else {
      d3Select(this.svgEl.current)
        .selectAll('.data-point')
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
      xValueAccessor,
      yValueAccessor,
      multiple,
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
      loading,
    } = this.state;

    const svgClasses = classnames('hrd svg-chart scatter-plot', {
      loading,
      loaded: !loading,
    });

    return (
      <div className="svg-container scatter-plot-container">
        {loading && (
          <CircularProgress
            className="chart-loader"
            scale={3}
            value={loading}
          />
        )}
        {data && multiple && (
          <Card className="legend">
            {data.map((cluster, i) => {
              const key = `legend-${cluster.className}-${i}`;

              return (
                <div key={key} className="container-flex spaced">
                  <div className="set-name">{cluster.className}</div>
                  <div className={`data-point ${cluster.className}`} />
                </div>
              );
            })}
          </Card>
        )}
        <Tooltip
          key="tooltip"
          pointData={selectedData || hoverPointData}
          posX={toolTipPosX}
          posY={toolTipPosY}
          show={showTooltip}
        />
        <svg
          key="scatter-plot"
          className={svgClasses}
          preserveAspectRatio="xMidYMid meet"
          viewBox={`0 0 ${width} ${height}`}
          ref={this.svgEl}
          style={{ opacity: 0 }}
        >
          {data &&
            multiple &&
            data.map((selection, i) => {
              const key = `${selection.className}-${i}`;

              return (
                <Points
                  key={key}
                  pointClasses={selection.className}
                  data={selection.data}
                  selectedData={selectedData}
                  hoveredData={hoverPointData}
                  xScale={xScale}
                  yScale={yScale}
                  xValueAccessor={xValueAccessor}
                  yValueAccessor={yValueAccessor}
                />
              );
            })}
          {data && !multiple && (
            <Points
              data={data}
              selectedData={selectedData}
              hoveredData={hoverPointData}
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
    );
  }
}

ScatterPlot.propTypes = {
  data: PropTypes.array,
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
  preSelected: PropTypes.bool,
  multiple: PropTypes.bool,
};

export default ScatterPlot;
