import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Bar extends React.PureComponent {
  render() {
    const { x, y, width, height, selected, hovered, classes } = this.props;
    const barClasses = classnames(`data-bar ${classes}`, {
      selected,
      hovered,
    });

    return (
      <rect
        className={barClasses}
        x={x}
        y={y}
        height={height}
        width={width}
        strokeWidth={1}
        fill="transparent"
        stroke="transparent"
      />
    );
  }
}

Bar.propTypes = {
  selected: PropTypes.bool,
  hovered: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  classes: PropTypes.string,
};

export default Bar;
