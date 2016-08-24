import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType
} from 'graphql';

const CommentFields = {
  id: { type: new NonNull(ID) },
  postId: { type: IntType },
  createdBy: { type: StringType },
  body: { type: StringType },
  status: { type: IntType },
  createdAt: { type: StringType },
  updatedAt: { type: StringType }
};

const CommentType = new ObjectType({
  name: 'Comment',
  fields: CommentFields
});

export { CommentType as default, CommentFields };
