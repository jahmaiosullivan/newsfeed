import util from 'util';
import actions from '../actions';

const initialState = {
  loaded: false,
  data: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.TAG_LOAD:
      return {
        ...state,
        loading: true
      };
    case actions.TAG_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data.tags,
        error: null
      };
    case actions.TAG_LOAD_FAIL:
      console.log( `TAG_LOAD_FAIL with error ${util.inspect( action.error )}` );
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
};
