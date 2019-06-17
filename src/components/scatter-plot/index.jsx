import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import Point from './Point.jsx';
import Tooltip from './Tooltip.jsx';

class ScatterPlot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPointData: null,
      hoverPointData: null,
      toolTipPosX: 0,
      toolTipPosY: 0,
      showTooltip: false,
    };

    // refs to attach d3 events, transitions, data bindings, etc.
    this.svgEl = React.createRef();
    this.xAxisContainer = React.createRef();
    this.yAxisContainer = React.createRef();
  }

  componentDidMount() {
    this.createScatterPlot();
  }

  componentDidUpdate() {
    this.updateScatterPlot();
  }

  // Update data point styles and attributes
  updatePoints($selection, data, xScale, yScale) {
    const { xValueAccessor, yValueAccessor } = this.props;
    const $allPoints = $selection.selectAll('rect').data(data);

    $allPoints
      .attr('key', d => {
        return `rect-${d.id}`;
      })
      .attr('x', d => {
        return xScale(d[xValueAccessor]);
      })
      .attr('y', d => {
        return yScale(d[yValueAccessor]);
      })
      .transition()
      .duration(1000)
      .ease(d3.easeCircle)
      .attr('rx', 6)
      .attr('fill', 'yellow')
      .attr('stroke', 'black')
      .attr('width', 12)
      .attr('height', 12);
  }

  // mouseover/focus handler for point
  mouseoverHandler = d => {
    // add hover style on point and show tooltip
    this.setState(prevState => ({
      ...prevState,
      hoverPointData: d,
      toolTipPosX: d3.event.pageX,
      toolTipPosY: d3.event.pageY,
      showTooltip: true,
    }));
  };

  // mouseout/blur handler for point
  mouseoutHandler = () => {
    const { selectedPointData } = this.state;
    const selectedPointId = selectedPointData ? selectedPointData.id : null;

    // remove hover style on point but don't hide  tooltip
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
  clickHandler = d => {
    const { selectedPointData } = this.state;
    const selectedPointId = selectedPointData ? selectedPointData.id : null;

    // remove selected style on point
    if (d.id === selectedPointId) {
      this.setState(prevState => ({
        ...prevState,
        selectedPointData: null,
        toolTipPosX: d3.event.pageX,
        toolTipPosY: d3.event.pageY,
      }));
      // add selected style on point
    } else {
      this.setState(prevState => ({
        ...prevState,
        selectedPointData: d,
        toolTipPosX: d3.event.pageX,
        toolTipPosY: d3.event.pageY,
        showTooltip: true,
      }));
    }
  };

  // add event listeners to Scatterplot and Points
  addEventListeners($scatterplot, $allPoints) {
    $scatterplot.on('click', () => {
      // remove styles and selections when click on non-point
      if (d3.event.target.classList[0] !== 'data-point') {
        this.setState(prevState => ({
          ...prevState,
          selectedPointData: null,
          hoverPointData: null,
          showTooltip: false,
        }));
      }
    });

    // add event listeners to points
    $allPoints
      .on('mouseover focus', this.mouseoverHandler)
      .on('mouseout blur', this.mouseoutHandler)
      .on('click', this.clickHandler);
  }

  // create X Axis
  createXAxis(xScale) {
    const xAxis = d3.axisBottom(xScale);
    d3.select(this.xAxisContainer.current).call(xAxis);
  }

  // create Y Axis
  createYAxis(yScale) {
    const yAxis = d3.axisLeft(yScale).ticks(8);
    d3.select(this.yAxisContainer.current).call(yAxis);
  }

  // render Point components
  points(data) {
    const { selectedPointData, hoverPointData } = this.state;
    return data.map((d, i) => {
      const key = `$hrd-rect-${i}`;
      return (
        <Point
          key={key}
          data={d}
          selected={d === selectedPointData}
          hovered={d === hoverPointData}
          tabIndex="0"
        />
      );
    });
  }

  // add attributes to points
  stylePoints($allPoints, data, xScale, yScale) {
    const { xValueAccessor, yValueAccessor } = this.props;

    $allPoints
      .attr('key', d => {
        return `rect-${d.id}`;
      })
      .attr('x', d => {
        return xScale(d[xValueAccessor]);
      })
      .attr('y', d => {
        return yScale(d[yValueAccessor]);
      })
      .transition()
      .duration(1000)
      .ease(d3.easeCircle)
      .attr('rx', 6)
      .attr('fill', 'yellow')
      .attr('stroke', 'black')
      .attr('width', 12)
      .attr('height', 12);
  }

  // bind data to elements and add styles and attributes
  createScatterPlot() {
    const { width, height, padding, data } = this.props;
    const $scatterplot = d3.select(this.svgEl.current);
    const $allPoints = d3
      .select(this.svgEl.current)
      .selectAll('rect')
      .data(data);

    const xScale = d3
      .scaleLinear()
      .domain([10000, 3000])
      .range([padding, width - padding]);

    const yScale = d3
      .scaleLog()
      .domain([0.001, 100000])
      .range([height - padding, padding]);

    this.stylePoints($allPoints, data, xScale, yScale);
    this.createXAxis(xScale);
    this.createYAxis(yScale);
    this.addEventListeners($scatterplot, $allPoints);
  }

  // re-bind data to elements
  updateScatterPlot() {
    const { data } = this.props;

    d3.select(this.svgEl.current)
      .selectAll('rect')
      .data(data);
  }

  render() {
    const {
      selectedPointData,
      hoverPointData,
      toolTipPosX,
      toolTipPosY,
      showTooltip,
    } = this.state;
    const { data, width, height, padding, xAxisLabel, yAxisLabel } = this.props;

    return (
      <div>
        {selectedPointData && (
          <div style={{ position: 'relative', }}>
            <div style={{ position: 'absolute',
                top: '100px',
                left: '100px', }}>
              <h2>Selected Star</h2>
              <div>
                <span>ID: </span>
                <span>{selectedPointData.id}</span>
              </div>
              <div>
                <span>Temperature: </span>
                <span>{selectedPointData.teff}</span>
                <span> K</span>
              </div>
              <div>
                <span>Luminosity: </span>
                <span>{selectedPointData.luminosity}</span>
                <sub className="unit">&#8857;</sub>
              </div>
            </div>
          </div>
        )}
        <Tooltip
          key="tooltip"
          pointData={selectedPointData || hoverPointData}
          posX={toolTipPosX}
          posY={toolTipPosY}
          show={showTooltip}
        />
        <svg
          key="scatter-plot"
          className="scatter-plot-container"
          width={width}
          height={height}
          ref={this.svgEl}
        >
          <g className="rects">{this.points(data)}</g>
          <g
            className="x-axis axis"
            transform={`translate(0, ${height - padding})`}
            ref={this.xAxisContainer}
          />
          <text
            className="x-axis-label"
            transform={`translate(${width / 2}, ${height - padding / 3})`}
            style={{ textAnchor: 'middle', }}
          >
            {xAxisLabel}
          </text>
          <g
            className="y-axis axis"
            transform={`translate(${padding}, 0)`}
            ref={this.yAxisContainer}
          />
          <text
            className="y-axis-label"
            transform={`translate(${padding / 3}, ${height / 2}) rotate(-90)`}
            style={{ textAnchor: 'middle', }}
          >
            {yAxisLabel}
            <tspan baselineShift="sub">&#x2299;</tspan>
          </text>
        </svg>
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
  data: PropTypes.any,
  xValueAccessor: PropTypes.string,
  yValueAccessor: PropTypes.string,
};

export default ScatterPlot;
