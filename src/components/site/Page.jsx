import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from 'react-md/lib/Buttons/Button';
import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';

class Page extends React.PureComponent {
  static defaultProps = {
    previousText: 'Previous',
    nextText: 'Next',
    scrollable: -1,
  };

  renderNav() {
    const { previous, previousText, next, nextText, nextHandler } = this.props;

    return (
      <nav role="navigation" className="nav-secondary">
        {previous && (
          <Button
            flat
            primary
            swapTheming
            to={previous}
            component={Link}
            iconEl={<ArrowLeft />}
            iconBefore
          >
            {previousText}
          </Button>
        )}
        {next && (
          <Button
            flat
            primary
            swapTheming
            to={next}
            component={Link}
            iconEl={<ArrowRight />}
            iconBefore={false}
            onClick={nextHandler}
          >
            {nextText}
          </Button>
        )}
      </nav>
    );
  }

  render() {
    const {
      children,
      dividers,
      previous,
      next,
      layout,
      paginationLocation,
      scrollable,
    } = this.props;

    return (
      <div className="container-page">
        {layout === 'two-col' && (
          <div className="container-flex spaced">
            {React.Children.map(children, (child, i) => {
              const length = React.Children.count(children);
              const colWidth = Math.floor(100 / length);
              const colClasses = classnames(
                `col padded col-${i + 1}`,
                `col-width-${colWidth}`,
                {
                  scrollable: scrollable === i,
                  'col-fixed': scrollable >= 0 && scrollable !== i,
                }
              );

              return (
                <React.Fragment>
                  {dividers && i !== 0 && <div className="divider-vertical" />}
                  <div className={colClasses}>
                    {child}
                    {paginationLocation === i + 1 && this.renderNav()}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}
        {(!layout || layout === '') && (
          <React.Fragment>
            {children}
            {(next || previous) && this.renderNav()}
          </React.Fragment>
        )}
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.node,
  dividers: PropTypes.bool,
  previous: PropTypes.string,
  previousText: PropTypes.string,
  next: PropTypes.string,
  nextText: PropTypes.string,
  nextHandler: PropTypes.func,
  layout: PropTypes.string,
  paginationLocation: PropTypes.number,
  scrollable: PropTypes.number,
};

export default Page;
