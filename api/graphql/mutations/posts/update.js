import PostType from '../../types/PostType';
import { Post } from '../../../database/models';
import { createAuthorizedGraphQLQuery } from '../../graphQLHelper';
import {
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const args = {
  id: {type: new NonNull( IntType )},
  title: {type: new NonNull( StringType )},
  body: {type: new NonNull( StringType )},
  images: {type: StringType }
};
const mutationFunction = (values) => {
  return Post.find({ where: {id: values.id} }).then((post) => {
    if(post) {
      return post.updateAttributes(values);
    }
    return new Error(`Post to update with id ${id} not found in database`);
  });
};

export default createAuthorizedGraphQLQuery(PostType, args, mutationFunction);
