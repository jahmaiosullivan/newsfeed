import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/reducers/authReducer';
import { createForm } from 'rc-form';

@connect(
  () => ({}),
  authActions)
@createForm()
export default class Register extends Component {
  static propTypes = {
    form: PropTypes.object,
    register: PropTypes.func
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {register, form} = this.props;

    form.validateFields((error, values) => {
      console.log(error, values);

      if (!error) {
        const { email, password } = values;
        register( email.trim(), password.trim() );
        form.setFieldsValue({email: '', password: ''});
      }
    });
  };

  render() {
    const { form: {getFieldProps, getFieldError} } = this.props;
    return (
      <div>
        <Helmet title="Register"/>
        <h1>New User Registration</h1>
        <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input {...getFieldProps('email', { initialValue: '', rules: [{required: true, min: 3, whitespace: true}] })}
                type="text"
                placeholder="Enter your email"
              />
              {getFieldError('password') && getFieldError('password').join(',')}
              <input {...getFieldProps('password', { initialValue: '', rules: [{required: true, min: 3, whitespace: true}] })}
                type="password"
                placeholder="Enter your password"
              />
              {getFieldError('email') && getFieldError('email').join(',')}
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}
