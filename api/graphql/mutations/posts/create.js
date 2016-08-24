import PostType, { PostFields } from '../../types/PostType';
import { Post } from '../../../database/models';
import { createAuthorizedGraphQLQuery } from '../../graphQLHelper';
import underscore from 'lodash';
import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from 'graphql';

const mutationFunction = (values) => {
  return Post.create(values);
};

export default createAuthorizedGraphQLQuery(PostType, underscore.omit(PostFields, ['id', 'comments']), mutationFunction);

