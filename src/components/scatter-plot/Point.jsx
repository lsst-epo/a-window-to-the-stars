import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Point extends React.PureComponent {
  render() {
    const { x, y, selected, hovered, sourceId, classes } = this.props;
    const pointClasses = classnames(
      `data-point-${sourceId} data-point ${classes}`,
      {
        selected,
        hovered,
      }
    );

    return (
      <circle
        className={pointClasses}
        cx={x}
        cy={y}
        r={6}
        strokeWidth={1}
        fill="transparent"
        stroke="transparent"
      />
    );
  }
}

Point.propTypes = {
  selected: PropTypes.bool,
  hovered: PropTypes.bool,
  sourceId: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  classes: PropTypes.string,
};

export default Point;
