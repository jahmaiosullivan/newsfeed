import {Post, Comment } from '../../../database/models';
import util from 'util';
import {
  GraphQLList as List
} from 'graphql';
import PostType from '../../types/PostType';

export default  {
  type: new List(PostType),
  async resolve() {
    return await Post.findAll({
      order: [
        ['createdAt', 'DESC']
    ],
      include: [{
        model: Comment,
        as: 'comments'
        // where: { name: { $like: '%ooth%' } }
      }]
    });
  }
};
