import PostType, { PostFields } from '../../types/PostType';
import { Post } from '../../../database/models';
import underscore from 'lodash';
import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from 'graphql';

export default {
  type: PostType,
  args: underscore.omit(PostFields, ['id', 'comments']),
  async resolve(req, newValues) {
    return await Post.create(newValues);
  }
};
