import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Page extends React.PureComponent {
  // renderPagination(previous, next) {
  //   if (previous || next) {
  //     return (

  //     );
  //   }
  // }

  render() {
    const {
      children,
      title,
      previous,
      next,
      layout,
      paginationLocation,
    } = this.props;

    return (
      <div className="page-container">
        <header className="header-secondary">
          {title && <h2 className="header-title heading-secondary">{title}</h2>}
        </header>
        {layout === 'two-col' && (
          <div className="container-flex">
            {React.Children.map(children, (child, i) => {
              const length = React.Children.count(children);
              const colWidth = Math.floor(100 / length);
              return (
                <div
                  className={`col col-designation-${i +
                    1} col-width-${colWidth}`}
                >
                  {child}
                  {paginationLocation === i + 1 && (
                    <nav role="navigation" className="nav-secondary">
                      {previous && (
                        <span className="nav-item">
                          <Link to={previous}>Previous</Link>
                        </span>
                      )}
                      {next && (
                        <span className="nav-item">
                          <Link to={next}>Next</Link>
                        </span>
                      )}
                    </nav>
                  )}
                </div>
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
  title: PropTypes.string,
  previous: PropTypes.string,
  next: PropTypes.string,
  layout: PropTypes.string,
  paginationLocation: PropTypes.number,
  // colClasses: PropTypes.string,
};

export default Page;
