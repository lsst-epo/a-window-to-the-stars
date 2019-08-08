import React from 'react';
import PropTypes from 'prop-types';
import { select as d3Select } from 'd3-selection';
import { easeElastic as d3EaseElastic } from 'd3-ease';
import { datumInData, getSunValue } from '../../lib/utilities.js';
// import SunIcon from '../site/icons/Sun';

class Sun extends React.PureComponent {
  constructor(props) {
    super(props);

    this.baseSize = 6;
    this.sunData = getSunValue();
    this.svgEl = React.createRef();
    this.pathEl = React.createRef();
  }

  componentDidMount() {
    d3Select(this.pathEl.current).datum(getSunValue());
  }

  componentDidUpdate() {
    const { selectedData, hoveredData } = this.props;
    const selected = datumInData(selectedData, this.sunData);
    const hovered = datumInData(hoveredData, this.sunData);
    const $sun = d3Select(this.svgEl.current);

    if (selected || hovered) {
      $sun
        .raise()
        .transition()
        .duration(800)
        .ease(d3EaseElastic);
    } else {
      $sun
        .raise()
        .transition()
        .duration(400);
    }
  }

  render() {
    const { xScale, yScale, selectedData, hoveredData } = this.props;
    const { temperature, luminosity } = this.sunData;
    const selected = datumInData(selectedData, this.sunData);
    const hovered = datumInData(hoveredData, this.sunData);

    return (
      <svg
        className={selected || hovered ? 'spinning' : ''}
        ref={this.svgEl}
        x={xScale(temperature) - 24}
        y={yScale(luminosity) - 24}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
        height={38}
        width={38}
      >
        <path
          className="data-point sun"
          ref={this.pathEl}
          d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"
        />
      </svg>
    );
  }
}

Sun.propTypes = {
  selectedData: PropTypes.array,
  hoveredData: PropTypes.array,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
};

export default Sun;
