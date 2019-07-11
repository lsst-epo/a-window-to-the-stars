import React from 'react';
import PropTypes from 'prop-types';
import { select as d3Select, event as d3Event } from 'd3-selection';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import 'd3-transition';
import Points from './Points.jsx';
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
      showLasso: false,
      dragLine: [],
      dragLoop: [],
      xScale: d3ScaleLinear()
        .domain(props.xDomain)
        .range([props.padding, props.width]),
      yScale: d3ScaleLinear()
        .domain(props.yDomain)
        .range([props.height - props.padding, 0]),
    };

    this.svgEl = React.createRef();
  }

  componentDidMount() {
    this.updateScatterPlot();
    // console.log('component did mount');
  }

  componentDidUpdate(prevProps) {
    const { data, clearOnChange } = this.props;

    if (prevProps.data !== data) {
      this.updateScatterPlot();
    }

    /* eslint-disable react/no-did-update-set-state */
    if (clearOnChange !== prevProps.clearOnChange) {
      const { dataLassoCallback } = this.props;

      if (dataLassoCallback) {
        dataLassoCallback([]);
      }
    }
    /* eslint-enable react/no-did-update-set-state */
  }

  onDragStart = () => {
    this.setState(
      prevState => ({
        ...prevState,
        showLasso: false,
      }),
      () => {
        const { dataLassoCallback } = this.props;

        if (dataLassoCallback) {
          dataLassoCallback([]);
        }
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

    if (dataLassoCallback) {
      dataLassoCallback(d);
    }
  };

  // add event listeners to Scatterplot and Points
  addEventListeners() {
    d3Select(this.svgEl.current).on('click', () => {
      if (d3Event.target.classList[0] !== 'data-point') {
        const { dataLassoCallback } = this.props;

        if (dataLassoCallback) {
          dataLassoCallback([]);
        }
      }
    });
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

    if (!preSelected) {
      // console.log('adding event listeners');
      this.addEventListeners();
    }
  }

  render() {
    const { showLasso, xScale, yScale } = this.state;
    const {
      data,
      width,
      height,
      backgroundImage,
      filterBy,
      preSelected,
      selection,
      xValueAccessor,
      yValueAccessor,
    } = this.props;

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
            {data && (
              <Points
                data={data}
                selectedData={preSelected ? data : selection}
                filterBy={filterBy}
                xScale={xScale}
                yScale={yScale}
                xValueAccessor={xValueAccessor}
                yValueAccessor={yValueAccessor}
              />
            )}
            {!preSelected && (
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

StarSelector.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
  data: PropTypes.array,
  xValueAccessor: PropTypes.string,
  yValueAccessor: PropTypes.string,
  xDomain: PropTypes.array,
  yDomain: PropTypes.array,
  dataLassoCallback: PropTypes.func,
  clearOnChange: PropTypes.bool,
  backgroundImage: PropTypes.any,
  filterBy: PropTypes.string,
  preSelected: PropTypes.bool,
  selection: PropTypes.array,
};

export default StarSelector;
