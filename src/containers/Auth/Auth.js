import React from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import './Auth.css';
export default class Auth extends React.Component {

  state = {
      controls: {
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
        password: {
          label: 'Password',
          elementType: 'input',
          elementConfig: {
            type: 'password'
          },
          value: '',
          validation: {
            required: true,
            minLength: 7
          },
          valid: false
        }
      }
  }

  checkValidity = (value, rules) => {
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

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName] : {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }

    this.setState({
      controls: updatedControls
    });
  }


  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        label: this.state.controls[key].label,
        config: this.state.controls[key]
      });
    }

    const form =  formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        label={formElement.label}
        elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        />

    ));
    return (
      <div className="Auth">
        <h1>Sign in</h1>
        <form>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
      </div>
    )
  }
}
