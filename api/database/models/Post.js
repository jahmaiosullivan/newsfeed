import DataType from 'sequelize';
import Sequelize from '../sequelize';
import {createdUpdated} from './helpers';

const tablename = 'posts';
const Post = Sequelize.define( 'Post', Sequelize.Utils._.extend( {
    id: {
      type: DataType.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataType.STRING,
    body: DataType.STRING,
    images: DataType.TEXT,
    commentCount: DataType.INTEGER
  },
  createdUpdated.attributes
  ),

  Sequelize.Utils._.extend( {
    instanceMethods: {
      getTitle: () => {
        return this.title;
      }
    }
  }, createdUpdated.options ), {tableName: tablename} );

export {Post as default, tablename};
