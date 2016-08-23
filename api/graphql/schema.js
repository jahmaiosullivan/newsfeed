import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import {maskErrors} from 'graphql-errors';
import groups from './queries/groups/all';
import group from './queries/groups/single';
import events from './queries/events/all';
import posts from './queries/posts/all';
import users from './queries/users/all';
import event from './queries/events/single';
import city from './queries/cities/single';

import createPost from './mutations/posts/create';
import deletePost from './mutations/posts/delete';
import updatePost from './mutations/posts/update';

import { Create as createComment, Update as updateComment, Delete as deleteComment } from './mutations/comments/crud';

const schema =  new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      groups,
      group,
      events,
      event,
      posts,
      city,
      users
    }
  }),
  mutation: new ObjectType({
    name: 'Mutations',
    description: 'These are the things we can change',
    fields: () => ({
      createPost,
      updatePost,
      deletePost,
      createComment,
      updateComment,
      deleteComment
    })
  })
});
// maskErrors(schema);
export default schema;