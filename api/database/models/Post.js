import DataType from 'sequelize';
import Model from '../sequelize';

const tablename = 'posts';
const Post = Model.define( 'Post', {
  id: {
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  title: DataType.STRING,
  body: DataType.STRING,
  images: DataType.TEXT,
  createdBy: DataType.UUID,
  commentCount: DataType.INTEGER,
  createdAt: DataType.DATE,
  updatedBy: DataType.UUID,
  updatedAt: DataType.DATE
}, {tableName: tablename} );

export {Post as default, tablename};
