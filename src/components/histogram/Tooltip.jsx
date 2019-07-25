import React from 'react';
import PropTypes from 'prop-types';
import { select as d3Select } from 'd3-selection';
import 'd3-transition';
import { formatValue, extentFromSet } from '../../lib/utilities.js';

class Tooltip extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      barData: props.barData,
      visible: props.show,
    };

    this.el = React.createRef();
  }

  componentDidUpdate() {
    const { barData, posX, posY, show } = this.props;
    const { visible, barData: barDataState } = this.state;

    const $tooltip = d3Select(this.el.current);

    if (show && !visible) {
      this.showUpdate($tooltip, barData, posX, posY, show);
    } else if (show && visible && barData !== barDataState) {
      this.moveUpdate($tooltip, barData, posX, posY, show);
    } else if (!show) {
      this.hide($tooltip, show);
    }
  }

  showUpdate($tooltip, barData, posX, posY, show) {
    $tooltip
      .transition()
      .duration(10)
      .style('left', posX + 10 + 'px')
      .style('top', posY + 10 + 'px')
      .on('end', () => {
        this.setState(prevState => ({
          ...prevState,
          barData,
          visible: show,
        }));
      })
      .transition('fadeIn')
      .duration(400)
      .style('opacity', 1);
  }

  moveUpdate($tooltip, barData, posX, posY) {
    $tooltip
      .style('opacity', 1)
      .transition()
      .duration(400)
      .style('left', posX + 10 + 'px')
      .style('top', posY + 10 + 'px')
      .on('end', () => {
        this.setState(prevState => ({
          ...prevState,
          barData,
        }));
      });
  }

  hide($tooltip, show) {
    $tooltip
      .transition()
      .duration(400)
      .style('opacity', 0)
      .on('end', () => {
        this.setState(prevState => ({
          ...prevState,
          visible: show,
        }));
      });
  }

  render() {
    const { barData } = this.state;
    const { valueAccessor } = this.props;

    const formattedData = barData
      ? extentFromSet(barData, valueAccessor)
      : null;

    return (
      <div ref={this.el} style={{ opacity: 0 }} className="tooltip">
        {barData && (
          <div>
            <div>{barData.length} stars</div>
            {valueAccessor === 'temperature' && (
              <div>
                <span>{formatValue(formattedData[0], 0)}</span>
                <span className="unit">K</span>
                {` – `}
                <span>{formatValue(formattedData[1], 0)}</span>
                <span className="unit">K</span>
              </div>
            )}
            {valueAccessor === 'luminosity' && (
              <div>
                <span>{formatValue(formattedData[0], 4)}</span>
                <sub className="unit">&#8857;</sub>
                {` – `}
                <span>{formatValue(formattedData[1], 4)}</span>
                <sub className="unit">&#8857;</sub>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

Tooltip.propTypes = {
  innerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  barData: PropTypes.object,
  posX: PropTypes.number,
  posY: PropTypes.number,
  show: PropTypes.bool,
  valueAccessor: PropTypes.string,
};

export default Tooltip;
