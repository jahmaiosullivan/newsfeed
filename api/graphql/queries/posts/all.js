import {Post, Comment } from '../../../database/models';
import sequelize from '../../../database/sequelize';
import config from '../../../../config';
import util from 'util';
import {
  GraphQLList as List,
  GraphQLInt as IntType,
} from 'graphql';
import PostType from '../../types/PostType';

export default  {
  type: new List(PostType),
  args: {
    page: {type: IntType}
  },
  resolve(context, {page}) {
    return new Promise((resolve) => {
      resolve( Post.findAll( {
        attributes: ['Post.*', [sequelize.fn( 'COUNT', sequelize.col('Comments.id')), 'commentCount']],
        offset: page * config.paging.rows - config.paging.rows,
        limit: config.paging.rows,
        include: [{
          model: Comment,
          attributes: [],
          duplicating: false
        }],
        group: [sequelize.col('Post.id')],
        order: [
          ['createdAt', 'DESC']
        ],
        raw: true
      }));
    });
  }
};
