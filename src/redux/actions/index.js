import config from '../../../config';

function createActionName(area, name) {
  return `${config.app.title}/${area}/${name}`;
}

const userActions = {
  USER_LOAD_SUCCESS: createActionName( 'users', 'LOAD_SUCCESS' ),
  USER_LOAD_FAIL: createActionName( 'users', 'LOAD_FAIL' ),
  USER_LOAD: createActionName( 'users', 'LOAD' )
};

const tagActions = {
  TAG_LOAD_SUCCESS: createActionName( 'tags', 'LOAD_SUCCESS' ),
  TAG_LOAD_FAIL: createActionName( 'tags', 'LOAD_FAIL' ),
  TAG_LOAD: createActionName( 'tags', 'LOAD' )
};

const postActions = {
  POST_LOAD_SUCCESS: createActionName( 'posts', 'LOAD_SUCCESS' ),
  POST_LOAD_FAIL: createActionName( 'posts', 'LOAD_FAIL' ),
  POST_LOAD: createActionName( 'posts', 'LOAD' ),
  POST_NEW_TOGGLE: createActionName( 'posts', 'TOGGLE' ),
  POST_NEW: createActionName( 'posts', 'NEW_POST' ),
  POST_NEW_SUCCESS: createActionName( 'posts', 'NEW_POST_SUCCESS' ),
  POST_NEW_FAIL: createActionName( 'posts', 'NEW_POST_FAIL' ),
  POST_DELETE: createActionName( 'posts', 'DELETE_POST' ),
  POST_DELETE_SUCCESS: createActionName( 'posts', 'DELETE_POST_SUCCESS' ),
  POST_DELETE_FAIL: createActionName( 'posts', 'DELETE_POST_FAIL' ),
  POST_UPDATE: createActionName( 'posts', 'UPDATE' ),
  POST_UPDATE_SUCCESS: createActionName( 'posts', 'UPDATE_SUCCESS' ),
  POST_UPDATE_FAIL: createActionName( 'posts', 'UPDATE_FAIL' ),
  POST_EDIT_START: createActionName( 'posts', 'EDIT_START' ),
  POST_EDIT_STOP: createActionName( 'posts', 'EDIT_STOP' ),
  SAVE_FILE: createActionName( 'files', 'SAVE_FILE' ),
  SAVE_FILE_SUCCESS: createActionName( 'files', 'SAVE_FILE_SUCCESS' ),
  SAVE_FILE_FAIL: createActionName( 'files', 'SAVE_FILE_FAIL' ),
  ADD_COMMENT: createActionName( 'posts', 'ADD_COMMENT' ),
  ADD_COMMENT_SUCCESS: createActionName( 'posts', 'ADD_COMMENT_SUCCESS' ),
  ADD_COMMENT_FAIL: createActionName( 'posts', 'ADD_COMMENT_FAIL' ),
  POST_COMMENT_LOAD_SUCCESS: createActionName( 'posts', 'COMMENT_LOAD_SUCCESS' ),
  POST_COMMENT_LOAD_FAIL: createActionName( 'posts', 'COMMENT_LOAD_FAIL' ),
  POST_COMMENT_LOAD: createActionName( 'posts', 'COMMENT_LOAD' )
};

const cityActions = {
  CITY_LOAD: createActionName('city', 'LOAD'),
  CITY_LOAD_SUCCESS: createActionName('city', 'LOAD_SUCCESS'),
  CITY_LOAD_FAIL: createActionName('city', 'LOAD_FAIL')
};

export default {...postActions, ...cityActions, ...userActions, ...tagActions};
