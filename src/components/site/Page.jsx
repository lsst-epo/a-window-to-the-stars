import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';
import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';

class Page extends React.PureComponent {
  static defaultProps = {
    previousText: 'Previous',
    nextText: 'Next',
    scrollable: -1,
  };

  render() {
    const {
      children,
      dividers,
      previous,
      previousText,
      next,
      nextText,
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
              return (
                <React.Fragment>
                  {dividers && i !== 0 && <div className="divider-vertical" />}
                  <div
                    className={`
                      col padded col-${i + 1}
                      col-width-${colWidth}
                      ${scrollable === i ? 'scrollable' : ''}
                    `}
                  >
                    {child}
                    {paginationLocation === i + 1 && (
                      <nav role="navigation" className="nav-secondary">
                        {previous && (
                          <Button
                            flat
                            secondary
                            swapTheming
                            to={previous}
                            component={Link}
                            iconEl={<ArrowLeft />}
                            iconBefore={false}
                          >
                            {previousText}
                          </Button>
                        )}
                        {next && (
                          <Button
                            flat
                            secondary
                            swapTheming
                            to={next}
                            component={Link}
                            iconEl={<ArrowRight />}
                            iconBefore={false}
                          >
                            {nextText}
                          </Button>
                        )}
                      </nav>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}
        {!layout && children}
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
  layout: PropTypes.string,
  paginationLocation: PropTypes.number,
  scrollable: PropTypes.number,
  // colClasses: PropTypes.string,
};

export default Page;
