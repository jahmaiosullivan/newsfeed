import {Tag} from '../../../database/models';
import {
  GraphQLList as List
} from 'graphql';
import TagType from '../../types/TagType';

export default  {
  type: new List(TagType),
  args: {
  },
  async resolve(req) {
    return await Tag.findAll({
      order: [
        ['createdAt', 'ASC']
      ]});
  }
};
