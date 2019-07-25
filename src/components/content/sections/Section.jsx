import React from 'react';
import PropTypes from 'prop-types';
import Page from '../../site/Page';

class Section extends React.PureComponent {
  static defaultProps = {
    id: '0',
    layout: 'two-col',
    dividers: false,
    paginationLocation: 1,
  };

  getPreviousLink(link, id) {
    const potentialLink = parseInt(id, 10) - 1;
    return link || potentialLink < 0 ? null : `/${potentialLink}`;
  }

  getNextLink(link, id) {
    return link || `/${parseInt(id, 10) + 1}`;
  }

  render() {
    const {
      children,
      id,
      layout,
      dividers,
      paginationLocation,
      previous,
      next,
      nextHandler,
      scrollable,
    } = this.props;

    return (
      <Page
        next={this.getNextLink(next, id)}
        previous={this.getPreviousLink(previous, id)}
        previousText="Back"
        nextText="Continue"
        nextHandler={nextHandler}
        layout={layout}
        dividers={dividers}
        paginationLocation={paginationLocation}
        scrollable={scrollable}
      >
        {children}
      </Page>
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
  previous: PropTypes.string,
  nextHandler: PropTypes.func,
  scrollable: PropTypes.number,
};

export default Section;
