import React from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {

  componentWillUpdate() {
    console.log('order summary will update')
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>{igKey}: {this.props.ingredients[igKey]}</li>
      );
    });

    return (
      <div>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </div>
    )
  }

}


export default OrderSummary;
