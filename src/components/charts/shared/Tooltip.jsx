import React from 'react';
import PropTypes from 'prop-types';
import { select as d3Select } from 'd3-selection';
import 'd3-transition';
import {
  formatValue,
  capitalize,
  extentFromSet,
} from '../../../lib/utilities.js';

class Tooltip extends React.PureComponent {
  constructor(props) {
    super(props);

    this.el = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { data, posX, posY, show } = this.props;
    const { show: isVisible, data: prevData } = prevProps;
    const $tooltip = d3Select(this.el.current);

    if (show && !isVisible) {
      this.show($tooltip, data, posX, posY, show);
    }

    if (show && isVisible && data !== prevData) {
      this.move($tooltip, data, posX, posY, show);
    }

    if (!show) {
      this.hide($tooltip, show);
    }
  }

  show($tooltip, data, posX, posY) {
    $tooltip
      .style('left', posX + 10 + 'px')
      .style('top', posY + 10 + 'px')
      .transition('fadeIn')
      .duration(400)
      .style('opacity', 1);
  }

  move($tooltip, data, posX, posY) {
    $tooltip
      .style('opacity', 1)
      .transition()
      .duration(400)
      .style('left', posX + 10 + 'px')
      .style('top', posY + 10 + 'px');
  }

  hide($tooltip) {
    $tooltip
      .transition()
      .duration(400)
      .style('opacity', 0);
  }

  getUnit(accessor) {
    if (accessor === 'temperature') {
      return 'K';
    }

    if (accessor === 'luminosity') {
      return <sub>&#8857;</sub>;
    }

    if (accessor === 'mass') {
      return ' Msun';
    }

    if (accessor === 'lifetime') {
      return ' Gyr';
    }

    if (accessor === 'radius') {
      return ' Rsun';
    }

    return null;
  }

  getValue(accessor, data) {
    if (!data) return null;
    if (accessor === 'luminosity') {
      return formatValue(data, 4);
    }

    if (accessor === 'radius') {
      return formatValue(data, 2);
    }

    if (accessor === 'lifetime') {
      return formatValue(data / 1000000000, 2);
    }

    return formatValue(data, 0);
  }

  renderValue(accessor, data) {
    return (
      <React.Fragment>
        <span>{this.getValue(accessor, data)}</span>
        <span className="unit">{this.getUnit(accessor)}</span>
      </React.Fragment>
    );
  }

  renderRange(accessor, data) {
    const minMax = extentFromSet(data, accessor);

    return (
      <React.Fragment>
        {this.renderValue(accessor, minMax[0])}
        {` – `}
        {this.renderValue(accessor, minMax[1])}
      </React.Fragment>
    );
  }

  renderAccessor(accessor, data) {
    return (
      <div className="value-row">
        <span>{capitalize(accessor)}: </span>
        {data.length > 1 && this.renderRange(accessor, data)}
        {data.length === 1 && this.renderValue(accessor, data[0][accessor])}
      </div>
    );
  }

  render() {
    const { data, accessors } = this.props;

    return (
      <React.Fragment>
        {data && (
          <div ref={this.el} style={{ opacity: 0 }} className="tooltip">
            {data.length > 1 && (
              <div className="value-row">{data.length} stars</div>
            )}
            {accessors.map(accessor => {
              return this.renderAccessor(accessor, data);
            })}
          </div>
        )}
      </React.Fragment>
    );
  }
}

Tooltip.propTypes = {
  data: PropTypes.object,
  posX: PropTypes.number,
  posY: PropTypes.number,
  show: PropTypes.bool,
  accessors: PropTypes.array,
};

export default Tooltip;
