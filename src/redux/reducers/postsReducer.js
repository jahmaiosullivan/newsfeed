import util from 'util';
import lodash from 'lodash';
import actions from '../actions';

const initialState = {
  loaded: false,
  hasMore: true,
  data: [],
  newPost: {
    title: '',
    body: '',
    show: false,
    images: []
  },
  newComment: {
    body: ''
  },
  saving: false,
  deleting: false,
  editing: {}
};

const changePostImagesToArray = (post) => {
  if (post.images !== null) {
    post.images = (post.images.trim() === '') ? null : lodash.map(post.images.split(','), (image) => { return {preview: image, loading: false}; });
  }
  return post;
};

const addCommentToPost = (post, comment) => {
  if (post.comments !== null) {
    post.title = 'I spliced it';
    post.comments.push(comment);
  }
  return post;
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.POST_LOAD:
      return {
        ...state,
        loading: true
      };
    case actions.POST_LOAD_SUCCESS:
      // Change all images from url to an object of shape { preview: <url> }
      lodash.each(action.result.data.posts, changePostImagesToArray);

      return {
        ...state,
        loading: false,
        loaded: true,
        hasMore: action.result.data.posts.length > 0,
        data: state.data.concat(action.result.data.posts),
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
    case actions.POST_NEW_TOGGLE:
      return {
        ...state,
        newPost: {...state.newPost, show: !state.newPost.show }
      };
    case actions.POST_NEW:
      return {
        ...state,
        saving: true
      };
    case actions.POST_NEW_SUCCESS:
      const post = changePostImagesToArray(action.result.data.createPost);
      return {
        ...state,
        data: [post, ...state.data],
        saving: false
      };
    case actions.POST_NEW_FAIL:
      console.log( `NEW_POST_FAIL with error ${util.inspect( action.error )}` );
      return {
        ...state,
        saving: false,
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
      const updatedPost = changePostImagesToArray(action.result.data.updatePost);
      const itemIndex = lodash.indexOf( state.data, lodash.find( state.data, {id: updatedPost.id} ) );
      state.data.splice( itemIndex, 1, updatedPost );
      return {
        ...state,
        editing: {
          ...state.editing,
          [updatedPost.id]: false
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
    case actions.SAVE_FILE:
      return {
        ...state,
        loading: true
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
        loading: false,
        loaded: true,
        error: null,
        newPost: {...state.newPost, images: appendedImages}
      };
    case actions.SAVE_FILE_FAIL:
      console.log( `SAVE_FILE_FAIL with error ${util.inspect( action.error )}` );
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case actions.ADD_COMMENT:
      return {
        ...state,
        saving: true
      };
    case actions.ADD_COMMENT_SUCCESS:
      // Find item index using indexOf+find
      const postIndex = lodash.indexOf(state.data, lodash.find(state.data, {id: action.result.data.createComment.postId}));
      const postWithNewComment = addCommentToPost(state.data[postIndex], action.result.data.createComment);
      // Replace item at index using native splice
      state.data.splice(postIndex, 1, postWithNewComment);
      console.log( `ADD_COMMENT_SUCCESS ${util.inspect(state.data[postIndex])}`);

      return {
        ...state,
        data: state.data,
        saving: false
      };
    case actions.ADD_COMMENT_FAIL:
      console.log( `ADD_COMMENT_FAIL with error ${util.inspect( action.error )}` );
      return {
        ...state,
        saving: false,
        error: action.error
      };
    default:
      return state;
  }
};
