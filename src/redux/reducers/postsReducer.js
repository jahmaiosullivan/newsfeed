import util from 'util';
import lodash from 'lodash';
import actions from '../actions';

const initialState = {
  loaded: false,
  data: [],
  deleting: false,
  editing: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.POST_LOAD:
      return {
        ...state,
        loading: true
      };
    case actions.POST_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data.posts,
        error: null
      };
    case actions.POST_LOAD_FAIL:
      console.log( `LOAD_FAIL with error ${util.inspect( action.error )}` );
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case actions.POST_DELETE:
      return {
        ...state,
        deleting: true
      };
    case actions.POST_DELETE_SUCCESS:
      const newPostList = lodash.remove( state.data, (currentObj) => {
        return currentObj.id !== action.result.data.deletePost.id;
      } );
      return {
        ...state,
        data: newPostList,
        deleting: false
      };
    case actions.POST_DELETE_FAIL:
      console.log( `DELETE_POST_FAIL with error ${util.inspect( action.error )}` );
      return {
        ...state,
        deleting: false,
        error: action.error
      };
    case actions.POST_EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case actions.POST_EDIT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case actions.POST_UPDATE:
      return {
        ...state,
        saving: true
      };
    case actions.POST_UPDATE_SUCCESS:
      const itemIndex = lodash.indexOf( state.data, lodash.find( state.data, {id: action.result.data.updatePost.id} ) );
      state.data.splice( itemIndex, 1, action.result.data.updatePost );
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.result.data.updatePost.id]: false
        },
        data: state.data,
        saving: false
      };
    case actions.POST_UPDATE_FAIL:
      console.log( `POST_UPDATE_FAIL with error ${util.inspect( action.error )}` );
      return {
        ...state,
        saving: false,
        error: action.error
      };
    case actions.COMMENT_NEW:
      return {
        ...state,
        saving: true
      };
    case actions.COMMENT_NEW_SUCCESS:
      return {
        ...state,
        saving: false
      };
    case actions.COMMENT_NEW_FAIL:
      console.log( `COMMENT_NEW_FAIL with error ${util.inspect( action.error )}` );
      return {
        ...state,
        saving: false,
        error: action.error
      };
    default:
      return state;
  }
};
