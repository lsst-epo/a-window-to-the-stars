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
    const { selected } = this.props;
    const $point = d3Select(this.el.current);
    if (selected) {
      this.selectStyle($point);
    } else {
      this.defaultStyle($point);
    }
  }

  defaultStyle($point) {
    $point
      .transition()
      .duration(200)
      .attr('r', 1)
      .attr('fill', 'transparent');
  }

  selectStyle($point) {
    $point
      .transition()
      .duration(200)
      .attr('r', 2)
      .attr('fill', 'red');
  }

  render() {
    return (
      <circle
        className="data-point"
        x={0}
        y={0}
        r={0}
        height={0}
        width={0}
        fill="transparent"
        ref={this.el}
      />
    );
  }
}

Point.propTypes = {
  selected: PropTypes.bool,
};

export default Point;
