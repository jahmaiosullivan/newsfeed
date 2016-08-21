import lodash from 'lodash';
import actions from '../actions';

export default (state, action = {}) => {
  switch (action.type) {
    case actions.SAVE_FILE_SUCCESS:
      console.log( `SAVE_FILE: ${action.result.url}` );
      const appendedImages = [...state.images];
      const indexOfFile = lodash.findIndex( appendedImages, (imageUrl) => {
        return imageUrl === action.result.url;
      });
      if (indexOfFile === -1) {
        appendedImages.push( action.result.url );
      }
      return appendedImages;
    default:
      return state;
  }
};
