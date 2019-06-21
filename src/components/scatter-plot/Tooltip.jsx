import React from 'react';
import PropTypes from 'prop-types';
import { select as d3Select } from 'd3-selection';
import 'd3-transition';

class Tooltip extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pointData: props.pointData,
      visible: props.show,
    };

    this.el = React.createRef();
  }

  componentDidUpdate() {
    const { pointData, posX, posY, show } = this.props;
    const { visible, pointData: pointDataState } = this.state;

    const $tooltip = d3Select(this.el.current);

    if (show && !visible) {
      this.showUpdate($tooltip, pointData, posX, posY, show);
    } else if (show && visible && pointData !== pointDataState) {
      this.moveUpdate($tooltip, pointData, posX, posY, show);
    } else if (!show) {
      this.hide($tooltip, show);
    }
  }

  showUpdate($tooltip, pointData, posX, posY, show) {
    $tooltip
      .transition()
      .duration(10)
      .style('left', posX + 10 + 'px')
      .style('top', posY + 10 + 'px')
      .on('end', () => {
        this.setState(prevState => ({
          ...prevState,
          pointData,
          visible: show,
        }));
      })
      .transition('fadeIn')
      .duration(400)
      .style('opacity', 1);
  }

  moveUpdate($tooltip, pointData, posX, posY) {
    $tooltip
      .style('opacity', 1)
      .transition()
      .duration(400)
      .style('left', posX + 10 + 'px')
      .style('top', posY + 10 + 'px')
      .on('end', () => {
        this.setState(prevState => ({
          ...prevState,
          pointData,
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
    const { pointData } = this.state;

    return (
      <div ref={this.el} style={{ opacity: 0 }} className="tooltip">
        <div>
          <span>Temperature: </span>
          <span>{pointData ? pointData.teff : null}</span>
          <span className="unit">K</span>
        </div>
        <div>
          <span>Luminosity: </span>
          <span>{pointData ? pointData.luminosity : null}</span>
          <sub className="unit">&#8857;</sub>
        </div>
      </div>
    );
  }
}

Tooltip.propTypes = {
  innerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  pointData: PropTypes.object,
  posX: PropTypes.number,
  posY: PropTypes.number,
  show: PropTypes.bool,
};

export default Tooltip;
