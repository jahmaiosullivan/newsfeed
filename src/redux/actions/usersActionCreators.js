import actions from './';
import util from 'util';

function loadUsers(userIds) {
  console.log(`loading users: ${util.inspect(userIds)}`);
  return {
    types: [actions.USER_LOAD, actions.USER_LOAD_SUCCESS, actions.USER_LOAD_FAIL],
    promise: (client) => client.graphQL( `{users { id, title, body, images, createdAt,updatedAt }}`)
  };
}

export { loadUsers };

