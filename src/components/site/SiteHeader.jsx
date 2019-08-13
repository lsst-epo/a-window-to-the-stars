import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Toolbar from 'react-md/lib/Toolbars/Toolbar';
// import SiteNav from './SiteNav';
import LinearProgress from 'react-md/lib//Progress/LinearProgress';
import { WithProgress } from '../content/containers/WithProgress';
import logo from '../../assets/images/lsst-logo.svg';

class SiteHeader extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     menuOpen: false,
  //   };
  // }

  // clickHandler = () => {
  //   this.setState(prevState => ({
  //     ...prevState,
  //     menuOpen: !prevState.menuOpen,
  //   }));
  // };

  // closeMenu = () => {
  //   this.setState(prevState => ({
  //     ...prevState,
  //     menuOpen: false,
  //   }));
  // };

  render() {
    // const { menuOpen } = this.state;
    const { pageProgress } = this.props;

    return (
      <Toolbar
        colored
        fixed
        title="LSST"
        titleClassName="screen-reader-only"
        className="header-primary"
      >
        <Link to="/" className="logo-wrapper">
          <span className="screen-reader-only">Home</span>
          <img aria-hidden src={logo} alt="LSST Logo" className="site-logo" />
        </Link>
        <LinearProgress className="page-progress" value={pageProgress} />
        {/*        <SiteNav
          menuOpen={menuOpen}
          handleClose={this.closeMenu}
          handleClick={this.clickHandler}
        /> */}
      </Toolbar>
    );
  }
}

SiteHeader.propTypes = {
  pageProgress: PropTypes.number,
};

export default WithProgress(SiteHeader);
