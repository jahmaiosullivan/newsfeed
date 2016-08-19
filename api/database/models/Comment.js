import DataType from 'sequelize';
import Model from '../sequelize';

const Comment = Model.define('Comment', {
  id: {
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  body: {type: DataType.TEXT},
  passwordHash: DataType.STRING,
  status: DataType.INTEGER,
  statusReason: DataType.STRING,
  createdAt: {type: DataType.DATE},
  createdBy: {type: DataType.UUID},
  updatedAt: {type: DataType.DATE},
  updatedBy: {type: DataType.UUID}
}, {

    indexes: [
      {fields: ['status']}
    ],
    tableName: 'comments'
  });

export {Comment as default};
