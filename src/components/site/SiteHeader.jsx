import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from 'react-md/lib/Toolbars/Toolbar';
// import SiteNav from './SiteNav';
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
        {/*        <SiteNav
          menuOpen={menuOpen}
          handleClose={this.closeMenu}
          handleClick={this.clickHandler}
        /> */}
      </Toolbar>
    );
  }
}

export default SiteHeader;
