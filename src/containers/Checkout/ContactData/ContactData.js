import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends React.Component {

  state = {
    orderForm: {
        name: {
          label: 'First Name',
          elementType: 'input',
          elementConfig: {
            type: 'text'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false
        },
        street: {
          label: 'Street',
          elementType: 'input',
          elementConfig: {
            type: 'text'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false
        },
        zipcode: {
          label: 'Zipcode',
          elementType: 'input',
          elementConfig: {
            type: 'text'
          },
          value: '',
          validation: {
            required: true,
            minLength: 5,
            maxLength: 5
          },
          valid: false
        },
        state: {
          label: 'State',
          elementType: 'input',
          elementConfig: {
            type: 'text'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false
        },
        country: {
          label: 'Country',
          elementType: 'input',
          elementConfig: {
            type: 'text'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false
        },
        email: {
          label: 'Email',
          elementType: 'input',
          elementConfig: {
            type: 'email'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false
        },
        deliveryMethod: {
          label: 'Delivery Method',
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'}
            ]
          },
          value: 'fastest',
          validation: {},
          valid: true
        }
    },
    formIsValid: false
  }

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    }
    this.props.onOrderBurger(order, this.props.token);
  }

  checkValidityHandler = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidityHandler(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }
    console.log(formIsValid)
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    });
  }


  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        label: this.state.orderForm[key].label,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            label={formElement.label}
            key={formElement.id}
            elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ))}
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />
    }
    return (
      <div className="ContactData">
        <h4>Enter your contact information</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));
