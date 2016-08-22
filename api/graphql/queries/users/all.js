import {User} from '../../../database/models';
import util from 'util';
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from 'graphql';
import UserType from '../../types/UserType';

export default  {
  type: new List(UserType),
  args: {
    ids: {type: new List( StringType )}
  },
  async resolve(rootValue, { ids }) {
    console.log(`values are ${util.inspect(ids)}`);
    return await User.findAll({
      where: {'id': {in: ids}},
      order: [
        ['createdAt', 'DESC']
    ]});
  }
};
