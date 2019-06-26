import React from 'react';
import Introduction from './Introduction';
import ExploringStarClusters from './ExploringStarClusters';
// import PropTypes from 'prop-types';

class Sections extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Introduction />
        <ExploringStarClusters id={1} />
      </React.Fragment>
    );
  }
}

// Sections.propTypes = {
//   menuOpen: PropTypes.bool,
//   handleClick: PropTypes.func,
//   handleClose: PropTypes.func,
// };

export default Sections;
