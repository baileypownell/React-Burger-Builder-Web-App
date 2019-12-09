import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';

const CheckoutSummary = (props) => {
  return (
    <div className="CheckoutSummary">
      <h1>Enjoy!</h1>
      <div style={{width: '100%', margin: 'auto', height: '40vh'}}>
        <Burger id="transparent" ingredients={props.ingredients}/>
      </div>
      <div className="flex">
        <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
      </div>
    </div>
  )
}

export default CheckoutSummary;
