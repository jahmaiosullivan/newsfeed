import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {reducer as form} from 'redux-form';

import auth from './authReducer';
import counter from './counterReducer';
import filters from './filtersReducer';
import info from './infoReducer';
import widgets from './widgetsReducer';
import groups from './groupsReducer';
import posts from './postsReducer';
import users from './usersReducer';
import city from './cityReducer';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  groups,
  posts,
  users,
  city,
  filters,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  widgets
});
