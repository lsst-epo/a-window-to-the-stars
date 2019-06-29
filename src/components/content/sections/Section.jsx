import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Page from '../../site/Page';

class Section extends React.PureComponent {
  static defaultProps = {
    id: '',
    layout: 'two-col',
    dividers: false,
    paginationLocation: 1,
  };

  render() {
    const { children, id, layout, dividers, paginationLocation } = this.props;
    return (
      <Route
        exact
        path={`/${id}`}
        render={routeProps => (
          <Page
            {...routeProps}
            next={`/${id + 1}`}
            nextText="Continue"
            layout={layout}
            dividers={dividers}
            paginationLocation={paginationLocation}
          >
            {children}
          </Page>
        )}
      />
    );
  }
}

Section.propTypes = {
  children: PropTypes.node,
  id: PropTypes.number,
  layout: PropTypes.string,
  dividers: PropTypes.bool,
  paginationLocation: PropTypes.number,
};

export default Section;
