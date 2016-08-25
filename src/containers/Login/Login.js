import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/reducers/authReducer';
import { createForm } from 'rc-form';

@connect(
  state => ({user: state.auth.user}),
  authActions)
@createForm()
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    form: PropTypes.object,
    logout: PropTypes.func
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {login, form} = this.props;

    form.validateFields((error, values) => {
      console.log(error, values);

      if (!error) {
        const { username, password } = values;
        login( username.trim(), password.trim() );
        form.setFieldsValue({username: '', password: ''});
      }
    });
  };

  render() {
    const {user, logout, form: {getFieldProps, getFieldError}} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <h1>Login</h1>
        {!user &&
        <div>
          <div>
            <form className="login-form form-inline" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input {...getFieldProps('username', { initialValue: '', rules: [{required: true, min: 3, whitespace: true}] })}
                  type="text"
                  placeholder="Enter your username"
                />
                {getFieldError('username') && getFieldError('username').join(',')}
                <input {...getFieldProps('password', { initialValue: '', rules: [{required: true, min: 3, whitespace: true}] })}
                  type="password"
                  placeholder="Enter your password"
                />
                {getFieldError('password') && getFieldError('password').join(',')}
              </div>
              <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/> Log In</button>
            </form>
            <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
          </div>
          <div>
            <h1>Login with FB</h1>
            <div>
              <a href="/api/login/facebook">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z"
                  />
                </svg>
                <span>Log in with Facebook</span>
              </a>
            </div>
          </div>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.firstName} {user.lastName}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
