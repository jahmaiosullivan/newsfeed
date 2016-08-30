import DataType from 'sequelize';
import Sequelize from '../sequelize';

const tablename = 'tags';
const Fields = {
  id: {
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {type: DataType.TEXT},
  description: {type: DataType.TEXT},
  createdBy: DataType.UUID,
  createdAt: DataType.DATE,
  updatedBy: DataType.UUID,
  updatedAt: DataType.DATE
};

const Tag = Sequelize.define( 'Tag', Fields, {tableName: tablename} );

export {Tag as default, tablename};
