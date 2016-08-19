import CommentType from './CommentType';
import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as List,
  GraphQLNonNull as NonNull
} from 'graphql';

export default new ObjectType({
  name: 'Post',
  fields: {
    id: { type: new NonNull(IntType) },
    title: { type: StringType },
    body: { type: StringType },
    comments: { type: new List(CommentType) },
    images: { type: StringType },
    createdAt: { type: StringType },
    updatedAt: { type: StringType }
  }
});

