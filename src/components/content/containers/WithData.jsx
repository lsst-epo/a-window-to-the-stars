import React from 'react';
import PropTypes from 'prop-types';
import uniq from 'lodash/uniq';
import API from '../../site/API';

export const withData = (ComposedComponent, filter) => {
  class WrappedComponent extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        clusterData: [],
      };
    }

    componentDidMount() {
      const { dataPath } = this.props;

      if (filter) {
        API.get(dataPath).then(res => {
          const clusterData = uniq(
            res.data.stars.filter(datum => {
              return !!datum.is_member;
            })
          );

          this.setState(prevState => ({
            ...prevState,
            clusterData,
          }));
        });
      } else {
        API.get(dataPath).then(res => {
          const clusterData = res.data.stars;

          this.setState(prevState => ({
            ...prevState,
            clusterData,
          }));
        });
      }
    }

    render() {
      const { clusterData } = this.state;
      return <ComposedComponent {...this.props} clusterData={clusterData} />;
    }
  }

  WrappedComponent.propTypes = {
    dataPath: PropTypes.string,
  };

  return WrappedComponent;
};

export default withData;
