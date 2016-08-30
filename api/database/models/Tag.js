import DataType from 'sequelize';
import Model from '../sequelize';

const tablename = 'tags';
const Tag = Model.define( 'Tag', {
  id: {
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {type: DataType.TEXT},
  description: {type: DataType.TEXT},
  createdAt: {type: DataType.DATE},
  createdBy: {type: DataType.UUID},
  updatedAt: {type: DataType.DATE},
  updatedBy: {type: DataType.UUID}
}, {tableName: tablename} );

export {Tag as default, tablename};



