import PostType from '../../types/PostType';
import { Post } from '../../../database/models';
import util from 'util';
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
const mutationFunction = (values, currentUser) => {
  return Post.findOne({
      where: {id: values.id},
      attributes: ['id', 'title', 'body', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy']
    }).then((post) => {
    if(post) {
      if (post.createdBy !== currentUser.id) {
        return new Error(`Only creator of posts can update them!`);
      }

      return post.updateAttributes(values);
    }
    return new Error(`Post to update with id ${id} not found in database`);
  });
};

export default createAuthorizedGraphQLQuery(PostType, args, mutationFunction);
