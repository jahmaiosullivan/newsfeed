import actions from '../actions';
const initialState = {
  avatarimg: './images/avatar.jpg'
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.POST_LOAD_SUCCESS:
      console.log(`POST_LOAD_SUCCESS from user reducer`);
      return state;
    default:
      return state;
  }
}

export {reducer as default};
