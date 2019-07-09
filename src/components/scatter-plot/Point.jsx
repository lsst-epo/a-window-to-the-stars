import React from 'react';
import PropTypes from 'prop-types';
import { select as d3Select } from 'd3-selection';

class Point extends React.PureComponent {
  constructor(props) {
    super(props);

    this.el = React.createRef();
  }

  componentDidMount() {
    const $point = d3Select(this.el.current);
    this.defaultStyle($point);
  }

  componentDidUpdate() {
    const { selected, hovered } = this.props;
    const $point = d3Select(this.el.current);
    if (selected) {
      this.selectStyle($point);
    } else if (hovered) {
      this.hoverStyle($point);
    } else {
      this.defaultStyle($point);
    }
  }

  defaultStyle($point) {
    $point
      .transition()
      .duration(200)
      .attr('stroke', 'black')
      .attr('fill', 'yellow');
  }

  selectStyle($point) {
    $point
      .transition()
      .duration(200)
      .attr('stroke', 'black')
      .attr('fill', 'lightsteelblue');
  }

  hoverStyle($point) {
    $point
      .transition()
      .duration(200)
      .attr('stroke', 'black')
      .attr('fill', 'red');
  }

  render() {
    return (
      <rect
        className="data-point"
        x={0}
        y={0}
        rx={0}
        height={0}
        width={0}
        strokeWidth={1}
        transform="translate(-6, -6)"
        fill="transparent"
        stroke="transparent"
        ref={this.el}
      />
    );
  }
}

Point.propTypes = {
  selected: PropTypes.bool,
  hovered: PropTypes.bool,
};

export default Point;
