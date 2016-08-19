import {Post} from '../../../database/models';
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
    ]});
  }
};
