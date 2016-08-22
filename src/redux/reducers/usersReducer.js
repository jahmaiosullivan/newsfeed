import actions from '../actions';
import util from 'util';

const initialState = {
  avatarimg: './images/avatar.jpg',
  loading: false,
  loaded: false,
  data: []
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.USER_LOAD:
      return {
        ...state,
        loading: true
      };
    case actions.USER_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: state.data.concat(action.result.data.users),
        error: null
      };
    case actions.USER_LOAD_FAIL:
      console.log( `USER_LOAD_FAIL with error ${util.inspect( action.error )}` );
      return {
        ...state,
        loaded: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}

export {reducer as default};
