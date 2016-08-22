import actions from './';

function loadUsers(userIds) {
  const userIdsCommaSeparatedString = userIds.map((userId) => { return `\"${userId.trim()}\"`; }).join(',');
  const userQuery = `{ users(ids: [${userIdsCommaSeparatedString}] ) { id, name,email, emailConfirmed, picture, createdAt, createdBy, updateAt, updateBy }}`;
  return {
    types: [actions.USER_LOAD, actions.USER_LOAD_SUCCESS, actions.USER_LOAD_FAIL],
    promise: (client) => client.graphQL(userQuery )
  };
}

export { loadUsers };

