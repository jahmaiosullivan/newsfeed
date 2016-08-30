import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from 'graphql';

const TagFields = {
  id: { type: new NonNull(ID) },
  name: { type: StringType },
  description: { type: StringType },
  createdBy: { type: StringType },
  createdAt: { type: StringType },
  updatedBy: { type: StringType },
  updatedAt: { type: StringType }
};

const TagType = new ObjectType({
  name: 'Tag',
  fields: TagFields
});

export { TagType as default, TagFields };
