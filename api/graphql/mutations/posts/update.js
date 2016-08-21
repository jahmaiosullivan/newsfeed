import PostType from '../../types/PostType';
import { Post } from '../../../database/models';
import util from 'util';
import {
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

export default {
  type: PostType,
  args: {
    id: {type: new NonNull( IntType )},
    title: {type: new NonNull( StringType )},
    body: {type: new NonNull( StringType )},
    images: {type: StringType }
  },
  async resolve(value, values) {
    console.log(`update a post: ${util.inspect(values)}`);

    const existingPost = await Post.find({ where: {id: values.id} });
    if(existingPost) {
      return await existingPost.updateAttributes(values);
    }

    console.error(`Post to update with id ${id} not found in database`);
  }
};
