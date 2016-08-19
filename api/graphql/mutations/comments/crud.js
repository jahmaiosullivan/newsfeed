import CommentType from '../../types/CommentType';
import { Comment } from '../../../database/models';
import util from 'util';
import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull
} from 'graphql';

const Create = {
  type: CommentType,
  args: {
    body: {type: new NonNull( StringType )},
    postId: {type: IntType },
    status: {type: IntType }
  },
  async resolve(value, newValues) {
    console.log(`creating a comment like ${util.inspect(newValues)}`);
    return await Comment.create(newValues);
  }
};

const Update = {
  type: CommentType,
  args: {
    body: {type: new NonNull( StringType )},
    status: {type: IntType }
  },
  async resolve(value, {body, status}) {
    console.log(`update a comment: ${util.inspect({body, status})}`);

    const existingComment = await Comment.find({ where: {id} });
    if(existingComment) {
      return await existingComment.updateAttributes({status, body});
    }
  }
};

const Delete = {
  type: CommentType,
  args: {
    id: {type: new NonNull( IntType )}
  },
  async resolve(value, { id }) {
    await Comment.destroy({ where: { id } });
    return { id };
  }
};

export { Create, Update, Delete };