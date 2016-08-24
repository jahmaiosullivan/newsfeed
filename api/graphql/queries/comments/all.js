import {Comment} from '../../../database/models';
import {
  GraphQLInt as IntType,
  GraphQLList as List
} from 'graphql';
import CommentType from '../../types/CommentType';

export default  {
  type: new List(CommentType),
  args: {
    postId: {type: IntType}
  },
  async resolve(req, {postId}) {
    console.log(`comment postId is ${postId}`);
    return await Comment.findAll({
      where: { postId },
      order: [
        ['createdAt', 'DESC']
    ]});
  }
};
