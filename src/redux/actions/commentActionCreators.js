import actions from './';
import config from '../../../config';

function createNewComment({postId, body, status}) {
  const graphQlMutationQuery = `mutation CreateComment { createComment(body: \"${body}\",postId: ${postId},status: ${status}) {id, body, status, createdAt,updatedAt }}`;

  return {
    types: [actions.COMMENT_NEW, actions.COMMENT_NEW_SUCCESS, actions.COMMENT_NEW_FAIL],
    promise: (client) => client.post(config.graphQLEndpoint, {data: {query: graphQlMutationQuery}})
  };
}

export { createNewComment };
