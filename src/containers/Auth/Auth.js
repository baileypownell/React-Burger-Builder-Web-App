import React from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends React.Component {

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
      },
      isSignup: true
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

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup}
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

    let form =  formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        label={formElement.label}
        elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        />

    ));

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null;
    if (this.props.error) {
      let messageToUser = '';
      if (this.props.error.message === 'INVALID_EMAIL') {
        messageToUser = 'The email is invalid.';
      } else if (this.props.error.message === 'EMAIL_NOT_FOUND') {
        messageToUser = 'There is no account associated with this email.';
      } else if (this.props.error.message === 'INVALID_PASSWORD') {
        messageToUser = 'The password is invalid';
      } else if (this.props.error.message === 'USER_DISABLED') {
        messageToUser = 'The user has been disabled.';
      } else if (this.props.error.message === 'OPERATION_NOT_ALLOWED') {
        messageToUser = 'Password sign-in is disabled for this project.';
      } else if (this.props.error.message === 'EMAIL_EXISTS') {
        messageToUser = 'The email address is already in use by another account.';
      } else if (this.props.error.message === 'WEAK_PASSWORD') {
        messageToUser = 'The password must be 6 characters long or more.';
      } else if (this.props.error.message === 'USER_NOT_FOUND') {
        messageToUser = 'There is no user record corresponding to this identifier. The user may have been deleted.';
      }
      errorMessage = (
        <p>{messageToUser}</p>
      )
    }
    return (
      <div className="Auth">
        <h1>Sign Up</h1>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button
          clicked={this.switchAuthModeHandler}
          btnType="Danger">Switch to {this.state.isSignup ? 'Sign In' : 'Sign Up'}</Button>
        {errorMessage}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
