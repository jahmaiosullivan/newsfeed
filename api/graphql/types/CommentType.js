import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType
} from 'graphql';

export default new ObjectType({
  name: 'Comment',
  fields: {
    id: { type: new NonNull(ID) },
    postId: { type: IntType },
    body: { type: StringType },
    status: { type: BooleanType },
    createdAt: { type: StringType },
    updatedAt: { type: StringType }
  }
});

