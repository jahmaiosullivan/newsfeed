'use strict';

const tableName = 'comments';
const originalColumnName = 'postId';
const updatedColumnName = 'PostId';

module.exports = {
  up: function (queryInterface) {
    queryInterface.renameColumn(tableName, originalColumnName, updatedColumnName);
  },

  down: function (queryInterface) {
    queryInterface.renameColumn(tableName, updatedColumnName, originalColumnName);
  }
};
