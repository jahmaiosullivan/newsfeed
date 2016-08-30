'use strict';
const tableName = 'tags';
const indexes = ['createdAt'];

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      tableName,
      {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true
        },
        name: {type: Sequelize.TEXT},
        description: {type: Sequelize.TEXT},
        createdAt: {type: Sequelize.DATE},
        createdBy: {
          type: Sequelize.UUID,
          references: {model: "users", key: "id"},
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        },
        updatedAt: {type: Sequelize.DATE},
        updatedBy: {
          type: Sequelize.UUID,
          references: {model: "users", key: "id"},
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        }
      }
    ).then(() => {
      queryInterface.addIndex(tableName, indexes);
    });
  },

  down: function (queryInterface) {
    queryInterface.removeIndex(tableName, indexes).then(() => {
      queryInterface.dropTable(tableName);
    });
  }
};
