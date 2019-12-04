import React from 'react';
import { connect } from 'react-redux';
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
        <Toolbar
          isAuth={this.props.isAuthenticated}
          DrawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer} closed={this.sideDrawerClosedHanlder}/>
        <main className="Content">
        {this.props.children}
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
