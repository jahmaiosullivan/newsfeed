'use strict';

const tables = ['cities', 'posts', 'users'];

module.exports = {
  up: function (queryInterface, Sequelize) {
    tables.forEach((tableName) => {
      queryInterface.addColumn(
        tableName,
        'createdBy',
        {
          type: Sequelize.UUID,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        }
      );
      queryInterface.addColumn(
        tableName,
        'updatedBy',
        {
          type: Sequelize.UUID,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        }
      );
    });
  },

  down: function (queryInterface) {
    tables.forEach((tableName) => {
      queryInterface.removeColumn(
        tableName,
        'createdBy'
      );
      queryInterface.removeColumn(
        tableName,
        'updatedBy'
      );
    });
  }
};
