import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
  GraphQLNonNull as NonNull,
} from 'graphql';

export default new ObjectType({
  name: 'User',
  fields: {
    id: { type: new NonNull(ID) },
    name: { type: StringType },
    email: { type: StringType },
    emailConfirmed: { type: BooleanType },
    gender: { type: StringType },
    picture: { type: StringType },
    location: { type: StringType },
    profileId: { type: StringType },
    profileType: { type: StringType },
    website: { type: StringType },
    passwordHash: { type: StringType },
    createdAt: { type: StringType },
    createdBy: { type: new NonNull(ID) },
    updateAt: { type: StringType },
    updateBy: { type: new NonNull(ID) }
  }
});

