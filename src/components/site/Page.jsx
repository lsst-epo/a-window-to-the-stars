import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';

class Page extends React.PureComponent {
  static defaultProps = {
    previousText: 'Previous',
    nextText: 'Next',
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
    } = this.props;

    return (
      <div className="page-container">
        {layout === 'two-col' && (
          <div className="container-flex spaced">
            {React.Children.map(children, (child, i) => {
              const length = React.Children.count(children);
              const colWidth = Math.floor(100 / length);
              return (
                <React.Fragment>
                  {dividers && i !== 0 && <div className="divider-vertical" />}
                  <div
                    className={`col padded col-designation-${i +
                      1} col-width-${colWidth}`}
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
  // colClasses: PropTypes.string,
};

export default Page;
