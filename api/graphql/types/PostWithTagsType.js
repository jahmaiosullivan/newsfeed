import TagType from './TagType';
import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLList as List,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull
} from 'graphql';

const PostFields = {
  id: { type: new NonNull(IntType) },
  title: { type: StringType },
  body: { type: StringType },
  commentCount: { type: IntType },
  images: { type: StringType },
  tags: { type: new List(TagType) },
  createdAt: { type: StringType },
  createdBy: { type: StringType },
  updatedAt: { type: StringType },
  updatedBy: { type: StringType }
};

const PostWithTagsType = new ObjectType({
  name: 'PostWithTags',
  fields: PostFields
});

export {PostWithTagsType as default, PostFields };