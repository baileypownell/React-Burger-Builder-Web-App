import React from 'react';

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
        }
      }
  }

  render() {
    return {
      <div>
        <form>
        </form>
      </div>
    }
  }
}
