import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Point extends React.PureComponent {
  render() {
    const { selected, x, y, classes } = this.props;
    const pointClasses = classnames(`data-point ${classes}`, {
      selected,
    });

    return (
      <circle
        className={pointClasses}
        cx={x}
        cy={y}
        r={selected ? 2 : 1}
        fill="transparent"
      />
    );
  }
}

Point.propTypes = {
  selected: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number,
  classes: PropTypes.string,
};

export default Point;
