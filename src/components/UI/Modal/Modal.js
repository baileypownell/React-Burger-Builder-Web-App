import React from 'react';
import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  componentWillUpdate() {
    console.log('modal will update');
  }

  render() {
    return (
      <div>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div className={"Modal " + (this.props.show ? "showModal" : "")}>
          {this.props.children}
        </div>
      </div>
    )
  }
}



export default Modal;
