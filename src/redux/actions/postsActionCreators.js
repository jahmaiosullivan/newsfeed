import actions from './';
import config from '../../../config';
import {dateString} from '../../../utils';
// import util from 'util';

const postReturnFields = `id, title, body, images, commentCount, createdBy, createdAt, updatedBy, updatedAt, tags { id, name, description, createdBy, createdAt, updatedBy, updatedAt }`;

function isLoaded(globalState) {
  return globalState.posts && globalState.posts.loaded;
}

function loadPosts(page = 1) {
  return {
    types: [actions.POST_LOAD, actions.POST_LOAD_SUCCESS, actions.POST_LOAD_FAIL],
    promise: (client) => client.graphQL( `{posts(page: ${page}){ ${postReturnFields} }}`)
  };
}

function createNewPost({title, body, images, createdBy}) {
  return {
    types: [actions.POST_NEW, actions.POST_NEW_SUCCESS, actions.POST_NEW_FAIL],
    promise: (client) => client.graphQL( `mutation CreatePost { createPost(title: \"${title}\",body: \"${body}\",images: \"${images}\",createdBy: \"${createdBy}\") {${postReturnFields} }}`)
  };
}

function deletePost(id) {
  return {
    types: [actions.POST_DELETE, actions.POST_DELETE_SUCCESS, actions.POST_DELETE_FAIL],
    promise: (client) => client.graphQL(`mutation DeletePost { deletePost(id: ${id}){ id }}`)
  };
}

function editPostStart(id) {
  return { type: actions.POST_EDIT_START, id };
}

function editPostStop(id) {
  return { type: actions.POST_EDIT_STOP, id };
}

function editPost({id, title, body, images}) {
  return {
    types: [actions.POST_UPDATE, actions.POST_UPDATE_SUCCESS, actions.POST_UPDATE_FAIL],
    promise: (client) => client.graphQL( `mutation UpdatePost { updatePost(id: ${id}, title: \"${title}\", body: \"${body}\",images: \"${images}\" ){ ${postReturnFields}  }}`)
  };
}


function saveFile(file) {
  const filenameWithDatePrefix = `${dateString()}_${file.name}`;
  return {
    types: [actions.SAVE_FILE, actions.SAVE_FILE_SUCCESS, actions.SAVE_FILE_FAIL],
    promise: (client) => client.post( '/file/upload', {attach: [{name: filenameWithDatePrefix, value: file}], field: [{name: 'azureContainer', value: config.azure.postImagesContainer}]})
  };
}

function createNewComment({postId, body, status, createdBy}) {
  const graphQlCreateCommentQuery = `mutation CreateComment { createComment(body: \"${body}\",postId: ${postId},status: ${status},createdBy: \"${createdBy}\") {id, body, status, createdAt,createdBy postId, updatedAt }}`;

  return {
    types: [actions.ADD_COMMENT, actions.ADD_COMMENT_SUCCESS, actions.ADD_COMMENT_FAIL],
    promise: (client) => client.graphQL(graphQlCreateCommentQuery)
  };
}

function loadComments(postId) {
  return {
    types: [actions.POST_COMMENT_LOAD, actions.POST_COMMENT_LOAD_SUCCESS, actions.POST_COMMENT_LOAD_FAIL],
    promise: (client) => client.graphQL( `{comments (postId: ${postId}){ id, body, status, createdAt,createdBy postId, updatedAt  }}`)
  };
}

export {isLoaded, loadPosts, createNewPost, deletePost, editPost, editPostStart, editPostStop, saveFile, createNewComment, loadComments };

