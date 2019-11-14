import React from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component {

  state = {
    orderForm: {
        name: {
          label: 'First Name',
          elementType: 'input',
          elementConfig: {
            type: 'text'
          },
          value: ''
        },
        street: {
          label: 'Street',
          elementType: 'input',
          elementConfig: {
            type: 'text'
          },
          value: ''
        },
        zipcode: {
          label: 'Zipcode',
          elementType: 'input',
          elementConfig: {
            type: 'text'
          },
          value: ''
        },
        state: {
          label: 'State',
          elementType: 'input',
          elementConfig: {
            type: 'text'
          },
          value: ''
        },
        country: {
          label: 'Country',
          elementType: 'input',
          elementConfig: {
            type: 'text'
          },
          value: ''
        },
        email: {
          label: 'Email',
          elementType: 'input',
          elementConfig: {
            type: 'email'
          },
          value: ''
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
          value: ''
        }
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
    axios.post('/orders.json', order)
    .then(response => {
      this.setState({ loading: false });
      this.props.history.push('/');
    })
    .catch(error => {
      this.setState({ loading: false });
    });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({
      orderForm: updatedOrderForm
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
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
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

export default ContactData;
