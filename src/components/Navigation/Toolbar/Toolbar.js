import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
const Toolbar = (props) => (
  <header className="Toolbar">
    <DrawerToggle clicked={props.DrawerToggleClicked}/>
    <div className="Logo-small">
      <Logo />
    </div>
    <nav className="DesktopOnly">
      <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
  </header>
);

export default Toolbar;
