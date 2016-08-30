import {Post, Comment, Tag } from '../../../database/models';
import sequelize from '../../../database/sequelize';
import config from '../../../../config';
import _ from 'lodash';

import {
  GraphQLList as List,
  GraphQLInt as IntType,
} from 'graphql';
import PostWithTagsType from '../../types/PostWithTagsType';

export default  {
  type: new List(PostWithTagsType),
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
      }).then((posts) => {
         return Tag.findAll({raw: true}).then((tags) => {
           posts = _.map(posts, (post) => {
             return _.extend({}, post, {tags});
           });
           return posts;
         });
      }));
    });
  }
};
