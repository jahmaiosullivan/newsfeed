import {User} from '../../../database/models';
import util from 'util';
import {
  GraphQLList as List
} from 'graphql';
import UserType from '../../types/UserType';

export default  {
  type: new List(UserType),
  async resolve() {
    return await User.findAll({
      order: [
        ['createdAt', 'DESC']
    ]});
  }
};
