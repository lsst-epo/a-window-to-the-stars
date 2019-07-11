import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Point extends React.PureComponent {
  // componentDidUpdate() {
  //   console.log('point did update', this.fill(this.props.selected, this.props.hovered));
  // }

  render() {
    const { x, y, selected, hovered } = this.props;
    const pointClasses = classnames('data-point', {
      selected,
      hovered,
    });

    return (
      <circle
        className={pointClasses}
        cx={x}
        cy={y}
        r={6}
        strokeWidth={1}
        fill="transparent"
        stroke="black"
      />
    );
  }
}

Point.propTypes = {
  selected: PropTypes.bool,
  hovered: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number,
};

export default Point;
