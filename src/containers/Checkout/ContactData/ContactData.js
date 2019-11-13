import React from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component {

  state = {
    orderForm: {
        name: 'Dwight',
        street: 'Beet Road',
        state: 'Pennsylvania',
        country: 'United States'
        email: 'schrutefarms@schrutefarms.com',
        deliveryMethod: 'fastest'
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
    }
    axios.post('/orders.json', order).
    then(response => {
      this.setState({ loading: false });
      this.props.history.push('/');
    })
    .catch(error => {
      this.setState({ loading: false });
    });
  }

  render() {
    let form = (
      <form>
        <Input inputtype="input" type="text" name="name" placeholder="John"></Input>
        <Input inputtype="input" type="email" name="email" ></Input>
        <Input inputtype="input" type="text" name="zipcode"></Input>
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
