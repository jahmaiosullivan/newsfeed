import DataType from 'sequelize';
import Sequelize from '../sequelize';
// import {createdUpdated} from './helpers';

const tablename = 'posts';

const Fields = {
  id: {
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  title: DataType.STRING,
  body: DataType.STRING,
  images: DataType.TEXT,
  commentCount: DataType.VIRTUAL,
  createdBy: DataType.UUID,
  createdAt: DataType.DATE,
  updatedBy: DataType.UUID,
  updatedAt: DataType.DATE
};

const Post = Sequelize.define( 'Post', Fields, {tableName: tablename} );

export {Post as default, tablename};
