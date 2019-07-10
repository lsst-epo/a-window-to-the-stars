import React from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';
import { select as d3Select, event as d3Event } from 'd3-selection';
import { easeCircle as d3EaseCircle } from 'd3-ease';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import 'd3-transition';
import Point from '../scatter-plot/Point.jsx';
import Lasso from '../scatter-plot/Lasso.jsx';

class StarSelector extends React.Component {
  static defaultProps = {
    width: 600,
    height: 600,
    padding: 0,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedData: null,
      hoverPointData: null,
      showLasso: false,
      dragLine: [],
      dragLoop: [],
      xScale: d3ScaleLinear()
        .domain([200, 0])
        .range([props.padding, props.width]),
      yScale: d3ScaleLinear()
        .domain([0, 200])
        .range([props.height - props.padding, 0]),
    };

    this.svgEl = React.createRef();
  }

  componentDidMount() {
    this.updateScatterPlot();
    console.log('component did mount');
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedData, hoverPointData } = this.state;
    const { data, dataSelectionCallback, clearOnChange } = this.props;
    const differentSelectedData = selectedData !== prevState.selectedData;
    const shouldCallback = dataSelectionCallback && differentSelectedData;

    if (prevProps.data !== data) {
      this.updateScatterPlot();
    }
    //  else {
    //   console.log('updating');
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
        selectedData: null,
      }));
    }
    /* eslint-enable react/no-did-update-set-state */
  }

  // mouseover/focus handler for point
  onMouseOver = d => {
    // add hover style on point
    this.setState(prevState => ({
      ...prevState,
      hoverPointData: d,
    }));
  };

  // mouseout/blur handler for point
  onMouseOut = () => {
    const { selectedData } = this.state;
    const selectedPointId =
      selectedData && !Array.isArray(selectedData) ? selectedData.id : null;

    // remove hover style on point
    if (selectedPointId) {
      this.setState(prevState => ({
        ...prevState,
        hoverPointData: null,
      }));
      // remove hover style on poin
    } else {
      this.setState(prevState => ({
        ...prevState,
        hoverPointData: null,
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
        selectedData: null,
        showLasso: false,
      }));
      // add selected style on point
    } else {
      this.setState(prevState => ({
        ...prevState,
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
    const $allPoints = d3Select(this.svgEl.current).selectAll('.data-point');

    $scatterplot.on('click', () => {
      // remove styles and selections when click on non-point
      if (d3Event.target.classList[0] !== 'data-point') {
        this.setState(prevState => ({
          ...prevState,
          hoverPointData: null,
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
      const key = `point-${i}`;
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
  updatePoints() {
    const { data, xValueAccessor, yValueAccessor } = this.props;
    const { xScale, yScale } = this.state;

    if (!data) {
      return;
    }

    const $allPoints = d3Select(this.svgEl.current)
      .selectAll('.data-point')
      .data(data);

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
      .attr('r', 4)
      .attr('fill', 'yellow');
  }

  // bind data to elements and add styles and attributes
  updateScatterPlot() {
    this.updatePoints();
    this.addEventListeners();
  }

  render() {
    const { showLasso } = this.state;
    const { width, height, backgroundImage } = this.props;

    return (
      <div>
        <div className="svg-container star-selector-container">
          <svg
            key="scatter-plot"
            className="scatter-plot-svg star-selector"
            preserveAspectRatio="xMidYMid meet"
            viewBox={`0 0 ${width} ${height}`}
            ref={this.svgEl}
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          >
            <g className="data-points">{this.points()}</g>
            <Lasso
              active={showLasso}
              lassoableEl={this.svgEl}
              dragCallback={this.onDrag}
              dragStartCallback={this.onDragStart}
              dragEndCallback={this.onDragEnd}
            />
          </svg>
        </div>
      </div>
    );
  }
}

StarSelector.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
  data: PropTypes.array,
  xValueAccessor: PropTypes.string,
  yValueAccessor: PropTypes.string,
  dataLassoCallback: PropTypes.func,
  dataSelectionCallback: PropTypes.func,
  clearOnChange: PropTypes.bool,
  backgroundImage: PropTypes.any,
};

export default StarSelector;
