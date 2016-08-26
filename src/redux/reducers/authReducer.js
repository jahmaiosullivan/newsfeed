const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';
const TOKEN_INFO = 'redux-example/auth/TOKEN_INFO';
const TOKEN_INFO_SUCCESS = 'redux-example/auth/TOKEN_INFO_SUCCESS';
const TOKEN_INFO_FAIL = 'redux-example/auth/TOKEN_INFO_FAIL';
const REGISTER = 'redux-example/auth/REGISTER';
const REGISTER_SUCCESS = 'redux-example/auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'redux-example/auth/REGISTER_FAIL';

import {removeBearerAuthToken, saveBearerAuthToken} from '../../helpers/authHelper';
import util from 'util';

const initialState = {
  loaded: false,
  loading: false,
  tokenExpired: false,
  loggingIn: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      saveBearerAuthToken( action.result.token );
      return {
        ...state,
        loggingIn: false,
        loading: false,
        loaded: true,
        user: action.result.user
      };
    case LOGIN_FAIL:
      console.log(`auth LOGIN_FAIL with error ${util.inspect(action.error)}`);
      return {
        ...state,
        loggingIn: false,
        loading: false,
        loaded: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      removeBearerAuthToken();

      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case REGISTER:
      return {
        ...state,
        registering: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        user: null
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registering: false,
        registerError: action.error
      };
    case TOKEN_INFO:
      return {
        ...state,
        tokenExpired: false
      };
    case TOKEN_INFO_SUCCESS:
      return {
        ...state,
        tokenExpired: action.result.expired
      };
    case TOKEN_INFO_FAIL:
      console.log(`TOKEN_INFO_FAIL with error ${util.inspect(action.error)}`);
      return {
        ...state,
        tokenExpired: false,
        loginError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.get('/auth/loadAuth')
  };
}

export function tokenInfo() {
  return {
    types: [TOKEN_INFO, TOKEN_INFO_SUCCESS, TOKEN_INFO_FAIL],
    promise: (client) => client.get('/auth/token')
  };
}

export function register(email, password) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: (client) => client.post( '/auth/register', {
      data: {
        email,
        password
      }
    })
  };
}

export function login(email, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post( '/login', {
      data: {
        email,
        password
      }
    } )
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get( '/logout' )
  };
}

