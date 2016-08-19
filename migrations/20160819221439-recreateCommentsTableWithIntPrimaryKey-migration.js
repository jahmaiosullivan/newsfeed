'use strict';
const tableName = 'comments';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.removeIndex(tableName, ['status']).then(() => {
      queryInterface.dropTable(tableName).then(() => {
        queryInterface.createTable(
          tableName,
          {
            id: {
              type: Sequelize.BIGINT,
              primaryKey: true,
              autoIncrement: true
            },
            body: {type: Sequelize.TEXT},
            passwordHash: {type: Sequelize.STRING},
            status: {type: Sequelize.INTEGER},
            postId: {
              type: Sequelize.BIGINT,
              references: { model: "posts", key: "id" },
              onUpdate: "CASCADE",
              onDelete: "CASCADE"
            },
            statusReason: {type: Sequelize.STRING},
            createdAt: {type: Sequelize.DATE},
            createdBy: {type: Sequelize.UUID},
            updatedAt: {type: Sequelize.DATE},
            updatedBy: {type: Sequelize.UUID}
          }
        ).then(() => {
          queryInterface.addIndex(tableName, ['status']);
        });
      })
    });
  },

  down: function (queryInterface) {

  }
};
