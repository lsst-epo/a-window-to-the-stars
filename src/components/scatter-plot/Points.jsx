import React from 'react';
import PropTypes from 'prop-types';
import Point from './Point.jsx';

class Points extends React.PureComponent {
  // componentDidMount() {
  //   console.log(
  //     'points did mount',
  //     this.props.selectedData,
  //     this.props.hoveredData
  //   );
  // }

  // componentDidUpdate() {
  //   console.log(
  //     'points did update',
  //     this.props.selectedData,
  //     this.props.hoveredData
  //   );
  // }

  checkId(data, id) {
    if (!data) return false;

    if (!Array.isArray(data)) {
      data = [data];
    }

    let selected = false;
    let i = 0;

    while (i < data.length) {
      if (id === data[i].source_id) {
        selected = true;
        i = data.length;
      }

      i += 1;
    }

    return selected;
  }

  render() {
    const {
      selectedData,
      hoveredData,
      filterBy,
      xScale,
      yScale,
      xValueAccessor,
      yValueAccessor,
    } = this.props;
    let { data } = this.props;

    if (!data) {
      return null;
    }

    if (!Array.isArray(data)) {
      data = [data];
    }

    return (
      <g className="data-points">
        {data.map(d => {
          if (filterBy && !d[filterBy]) {
            return null;
          }

          const { source_id: id } = d;
          const key = `point-${id}`;
          const selected = this.checkId(selectedData, id);
          const hovered = this.checkId(hoveredData, id);

          if (hovered) {
            // console.log('render hovered point');
          }
          if (selected) {
            // console.log('render selected point');
          }

          return (
            <Point
              key={key}
              x={xScale(d[xValueAccessor])}
              y={yScale(d[yValueAccessor])}
              selected={selected}
              hovered={hovered}
              tabIndex="0"
            />
          );
        })}
      </g>
    );
  }
}

Points.propTypes = {
  data: PropTypes.array,
  selectedData: PropTypes.bool,
  hoveredData: PropTypes.bool,
  filterBy: PropTypes.string,
  xValueAccessor: PropTypes.string,
  yValueAccessor: PropTypes.string,
  xScale: PropTypes.string,
  yScale: PropTypes.string,
};

export default Points;
