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
    const {
      children,
      id,
      layout,
      dividers,
      paginationLocation,
      next,
      nextHandler,
    } = this.props;

    return (
      <Route
        exact
        path={`/${id}`}
        render={routeProps => (
          <Page
            {...routeProps}
            next={next || `/${id + 1}`}
            nextText="Continue"
            nextHandler={nextHandler}
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
  next: PropTypes.string,
  nextHandler: PropTypes.func,
};

export default Section;
