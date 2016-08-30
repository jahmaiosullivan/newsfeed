import DataType from 'sequelize';
import Sequelize from '../sequelize';
import {createdUpdated} from './helpers';

const tablename = 'tags';
const Tag = Sequelize.define( 'Tag', Sequelize.Utils._.extend({
  id: {
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {type: DataType.TEXT},
  description: {type: DataType.TEXT}
}, createdUpdated.attributes),
  {tableName: tablename} );

export {Tag as default, tablename};



