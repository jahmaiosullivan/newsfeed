import PostType, { PostFields } from '../../types/PostType';
import { Post } from '../../../database/models';
import { createMutation } from '../mutationHelper';
import underscore from 'lodash';
import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from 'graphql';

const mutationFunction = (values) => {
  return Post.create(values);
};

const create = createMutation(PostType, underscore.omit(PostFields, ['id', 'comments']), mutationFunction);
export default create;

