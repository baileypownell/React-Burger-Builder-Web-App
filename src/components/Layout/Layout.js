import React from 'react';
import './layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {

  state = {
    showSideDrawer: true
  }

  sideDrawerClosedHanlder = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }

  render() {
    return (
      <div>
        <Toolbar DrawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHanlder}/>
        <main className="Content">
        {this.props.children}
        </main>
      </div>
    )
  }
}

export default Layout;
