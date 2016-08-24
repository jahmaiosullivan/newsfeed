import CommentType from './CommentType';
import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as List,
  GraphQLNonNull as NonNull
} from 'graphql';

const PostFields = {
  id: { type: new NonNull(IntType) },
  title: { type: StringType },
  body: { type: StringType },
  commentCount: { type: IntType },
  images: { type: StringType },
  createdAt: { type: StringType },
  createdBy: { type: StringType },
  updatedAt: { type: StringType },
  updatedBy: { type: StringType }
};

const PostType = new ObjectType({
  name: 'Post',
  fields: PostFields
});

export {PostType as default, PostFields };