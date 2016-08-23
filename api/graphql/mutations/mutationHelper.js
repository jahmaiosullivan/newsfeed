const createMutation = (type, args, cb) => {
  return {
    type,
    args,
    resolve({user}, newValues) {
      return new Promise(function (resolve, reject) {
        if (!user) {
          reject(new Error("Not authorized to perform this action."));
        }

        resolve(cb(newValues));
      });
    }
  };
};

export {createMutation};