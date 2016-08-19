'use strict';

const tableName = 'comments';
const columnName = 'passwordHash';

module.exports = {
  up: function (queryInterface) {
    queryInterface.removeColumn(tableName, columnName);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      tableName,
      columnName,
      Sequelize.STRING
    );
  }
};
