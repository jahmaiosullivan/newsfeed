import DataType from 'sequelize';
import Sequelize from '../sequelize';
import {createdUpdated} from './helpers';

const Comment = Sequelize.define( 'Comment', Sequelize.Utils._.extend({
  id: {
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  body: {type: DataType.TEXT},
  status: DataType.INTEGER,
  statusReason: DataType.STRING
}, createdUpdated.attributes), {
    indexes: [
      {fields: ['status']}
    ],
    tableName: 'comments'
  });

export {Comment as default};
