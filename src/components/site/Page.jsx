import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Page extends React.PureComponent {
  render() {
    const { children, title, previous, next } = this.props;

    return (
      <div className="page">
        <header className="header-secondary">
          {title && <h2 className="header-title heading-secondary">{title}</h2>}
          {(previous || next) && (
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
        </header>
        {children}
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  previous: PropTypes.string,
  next: PropTypes.string,
};

export default Page;
