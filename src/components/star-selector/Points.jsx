import React from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';
import Point from './Point.jsx';

class Points extends React.PureComponent {
  render() {
    const { selectedData, filterBy } = this.props;
    let { data } = this.props;

    if (!data) {
      return null;
    }

    if (!Array.isArray(data)) {
      data = [data];
    }

    return (
      <g className="data-points">
        {data.map((d, i) => {
          const key = `point-${i}`;
          const selected = d === selectedData || includes(selectedData, d);

          if (filterBy && !d[filterBy]) {
            return null;
          }

          return <Point key={key} data={d} selected={selected} tabIndex="0" />;
        })}
      </g>
    );
  }
}

Points.propTypes = {
  data: PropTypes.array,
  selectedData: PropTypes.bool,
  filterBy: PropTypes.string,
};

export default Points;
