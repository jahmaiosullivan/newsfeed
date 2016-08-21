import DataType from 'sequelize';
import Model from '../sequelize';

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
  createdAt: DataType.DATE,
  updatedBy: DataType.UUID,
  updatedAt: DataType.DATE
}, {tableName: 'posts'} );

export {Post as default};
