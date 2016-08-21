import util from 'util';
import lodash from 'lodash';
import actions from '../actions';

const initialState = {
  title: '',
  body: '',
  images: [],
  showStatus: false,
  saving: false,
  addingImage: false,
  saved: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.POST_NEW_TOGGLE:
      return {
        ...state,
        showStatus: !state.showStatus
      };
    case actions.POST_NEW:
      return {
        ...state,
        saving: true
      };
    case actions.POST_NEW_SUCCESS:
      return {
        ...state,
        data: action.result.data.createPost,
        saving: false
      };
    case actions.POST_NEW_FAIL:
      console.log( `NEW_POST_FAIL with error ${util.inspect( action.error )}` );
      return {
        ...state,
        saving: false,
        error: action.error
      };
    case actions.SAVE_FILE:
      return {
        ...state,
        addingImage: true
      };
    case actions.SAVE_FILE_SUCCESS:
      console.log( `SAVE_FILE: ${action.result.url}` ); // action.result.result and action.result.response
      const appendedImages = [...state.newPost.images];
      const indexOfFile = lodash.findIndex( appendedImages, (imageUrl) => {
        return imageUrl === action.result.url;
      });
      if (indexOfFile === -1) {
        appendedImages.push( action.result.url );
      }

      return {
        ...state,
        addingImage: false,
        error: null,
        images: appendedImages
      };
    case actions.SAVE_FILE_FAIL:
      console.log( `SAVE_FILE_FAIL with error ${util.inspect( action.error )}` );
      return {
        ...state,
        addingImage: false,
        error: action.error
      };
    default:
      return state;
  }
};
