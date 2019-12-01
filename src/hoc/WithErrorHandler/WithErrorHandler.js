import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import instance from '../../axios-orders';
const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {

    state = {
      error: null
    }

    componentDidMount() {
      this.reqInterceptor = instance.interceptors.request.use(req => {
        this.setState({ error: null});
        return req;
      });
      this.resInterceptor = instance.interceptors.response.use(res => res, error => {
        this.setState({ error: error})
      });
    }

    componentWillUnmount() {
      instance.interceptors.request.eject(this.reqInterceptor);
      instance.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null })
    }

    render() {
      return (
        <div>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </div>
      )
    }
  }
}

export default WithErrorHandler;
