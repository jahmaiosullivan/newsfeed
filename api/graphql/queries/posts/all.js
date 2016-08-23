import {Post, Comment } from '../../../database/models';
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
  async resolve({user}, { page }) {
    console.log(`finding posts now for user ${util.inspect(user)}`);
    const commentsAlias = {model: Comment, as: 'comments' }; // where: { name: { $like: '%ooth%' }};
    return await Post.findAll({
      offset:page * config.paging.rows - config.paging.rows,
      limit :config.paging.rows,
      include: [commentsAlias],
      order: [
        [ 'createdAt', 'DESC' ],
        [commentsAlias, 'createdAt', 'ASC']
      ]
    });
  }
};
