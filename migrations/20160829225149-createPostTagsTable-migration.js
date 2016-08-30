'use strict';
const tableName = 'postTags';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      tableName,
      {
        postId: {
          type: Sequelize.BIGINT,
          primaryKey: true
        },
        tagId: {
          type: Sequelize.BIGINT,
          primaryKey: true
        },
        createdAt: {type: Sequelize.DATE},
        createdBy: {
          type: Sequelize.UUID,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        },
        updatedAt: {type: Sequelize.DATE},
        updatedBy: {
          type: Sequelize.UUID,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        }
      }
    );
  },

  down: function (queryInterface) {
    queryInterface.dropTable(tableName);
  }
};
