import PostType from '../../types/PostType';
import { Post } from '../../../database/models';
import { createMutation } from '../mutationHelper';
import {
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const args = { id: {type: new NonNull( IntType )} };
const mutationFunction = ({ id }) => {
  Post.destroy({ where: { id } });
  return { id };
};

export default createMutation(PostType, args, mutationFunction);
