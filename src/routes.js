import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {removeBearerAuthToken} from './helpers/authHelper';
// import util from 'util';
import {isLoaded as isAuthLoaded, load as loadAuth, tokenInfo, logout} from 'redux/reducers/authReducer';
import {
  App,
  Chat,
  Home,
  Widgets,
  Groups,
  About,
  Login,
  Register,
  LoginSuccess,
  Survey,
  NotFound,
  TimeLine
} from './containers';

export default (store) => {
  const state = store.getState();
  const {auth: {user}} = state;

  const requireLogin = (nextState, replace, cb) => {
    if (!user) {
      // oops, not logged in, so can't be here!
      replace( '/' );
    }
    cb();
  };

  const requireAnonymous = (nextState, replace) => {
    if (user) {
      // oops, logged in, so can't be here!
      replace( '/' );
    }
  };

  const authenticateUserByCookie = async (nextState, replace, cb) => {
    const tokenExpire = await store.dispatch( tokenInfo() );
    if (tokenExpire.expired) {
      console.log(`tokenInfo expired`);
      store.dispatch(logout());
      // replace('/login');
      removeBearerAuthToken();
    }

    if (!isAuthLoaded( state )) {
      console.log(`loading auth`);
      await store.dispatch(loadAuth());
    }
    cb();
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App} onEnter={authenticateUserByCookie}>
      { /* Home (main) route */ }
      /*<IndexRoute component={TimeLine}/>*/

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="chat" component={Chat}/>
        <Route path="loginSuccess" component={LoginSuccess}/>
      </Route>

      <Route onEnter={requireAnonymous}>
        <Route path="login" component={Login}/>
        <Route path="register" component={Register}/>
      </Route>

      { /* Routes */ }
      <Route path="about" component={About}/>
      <Route path="timeline" component={TimeLine}/>
      <Route path="home" component={Home}/>
      <Route path="groups" component={Groups}/>
      <Route path="survey" component={Survey}/>
      <Route path="widgets" component={Widgets}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
