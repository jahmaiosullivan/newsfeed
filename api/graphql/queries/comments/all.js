import {Comment} from '../../../database/models';
import {
  GraphQLList as List
} from 'graphql';
import CommentType from '../../types/CommentType';

export default  {
  type: new List(CommentType),
  async resolve() {
    return await Comment.findAll({
      order: [
        ['createdAt', 'DESC']
    ]});
  }
};
