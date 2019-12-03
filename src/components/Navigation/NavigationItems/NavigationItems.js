import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
  <ul className="NavigationItems">
    <NavigationItem link="/" >Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    <NavigationItem link="/auth">Sign In</NavigationItem>
  </ul>
);

export default NavigationItems;
