import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
  <ul className="NavigationItems">
    <NavigationItem link="/" >Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    {!props.isAuthenticated ? <NavigationItem link="/auth">Sign In</NavigationItem> : <NavigationItem link="/logout">Log Out</NavigationItem>}
  </ul>
);

export default NavigationItems;
