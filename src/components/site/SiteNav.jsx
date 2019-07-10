import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Menu from 'react-md/lib/Menus/Menu';
import ListItem from 'react-md/lib/Lists/Listitem';
import Button from 'react-md/lib/Buttons/Button';
import More from './icons/More';

/* eslint-disable react/jsx-wrap-multilines */
class SiteNav extends React.PureComponent {
  render() {
    const { menuOpen, handleClick, handleClose } = this.props;

    return (
      <Menu
        visible={menuOpen}
        closeOnOutsideClick
        onClose={handleClose}
        toggle={
          <Button flat onClick={handleClick} className="menu-toggle">
            <span className="screen-reader-only">Toggle Main Nav</span>
            <More />
          </Button>
        }
        id="site-nav"
        className="site-nav"
        listClassName="site-nav-inner"
      >
        <ListItem
          key="site-nav-item-1"
          primaryText=""
          className="site-nav-item"
        >
          <Link to="/">Investigation</Link>
        </ListItem>
        <ListItem
          key="site-nav-item-2"
          primaryText=""
          className="site-nav-item"
        >
          <Link to="/styles">Style Guide</Link>
        </ListItem>
        <ListItem
          key="site-nav-item-test"
          primaryText=""
          className="site-nav-item"
        >
          <Link to="/statetest">Global State Test</Link>
        </ListItem>
        <ListItem
          key="site-nav-item-3"
          primaryText=""
          className="site-nav-item"
        >
          <Link to="/hrd">H-R Diagram</Link>
        </ListItem>
        <ListItem
          key="site-nav-item-4"
          primaryText=""
          className="site-nav-item"
        >
          <Link to="/temperature">Temperature Histogram</Link>
        </ListItem>
        <ListItem
          key="site-nav-item-5"
          primaryText=""
          className="site-nav-item"
        >
          <Link to="/luminosity">Luminosity Histogram</Link>
        </ListItem>
      </Menu>
    );
  }
}

SiteNav.propTypes = {
  menuOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  handleClose: PropTypes.func,
};

export default SiteNav;
