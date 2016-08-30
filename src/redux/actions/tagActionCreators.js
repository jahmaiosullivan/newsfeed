import actions from './';

const tagReturnFields = `id, name, description, createdBy, createdAt, updatedBy, updatedAt`;

function isLoaded(globalState) {
  return globalState.tags && globalState.tags.loaded;
}

function loadTags() {
  return {
    types: [actions.TAG_LOAD, actions.TAG_LOAD_SUCCESS, actions.TAG_LOAD_FAIL],
    promise: (client) => client.graphQL( `{tags{ ${tagReturnFields} }}`)
  };
}

export {isLoaded, loadTags };

