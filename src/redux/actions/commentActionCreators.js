import actions from './';

function createNewComment({postId, body, status}) {
  const graphQlCreateCommentQuery = `mutation CreateComment { createComment(body: \"${body}\",postId: ${postId},status: ${status}) {id, body, status, createdAt,updatedAt }}`;

  return {
    types: [actions.COMMENT_NEW, actions.COMMENT_NEW_SUCCESS, actions.COMMENT_NEW_FAIL],
    promise: (client) => client.graphQL(graphQlCreateCommentQuery)
  };
}

export { createNewComment };
