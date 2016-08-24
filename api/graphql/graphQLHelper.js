const createAnonymousGraphQLQuery = (type, args, cb) => {
  return createGraphQLQuery(type, args, cb, true);
};
const createAuthorizedGraphQLQuery = (type, args, cb) => {
  return createGraphQLQuery(type, args, cb, false);
};

const createGraphQLQuery = (type, args, cb, isAnonymous = false) => {
  return {
    type,
    args,
    resolve({user}, newValues) {
      return new Promise(function (resolve, reject) {
        if (!isAnonymous && !user) {
          reject(new Error("Not authorized to perform this action."));
        }

        resolve(cb(newValues));
      });
    }
  };
};

export {createAuthorizedGraphQLQuery, createAnonymousGraphQLQuery};