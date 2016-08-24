import {User} from '../../../database/models';
import util from 'util';
import { createAnonymousGraphQLQuery } from '../../graphQLHelper';
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from 'graphql';
import UserType from '../../types/UserType';

const type = new List(UserType);
const args = {ids: {type: new List( StringType )}};
const userFunc = ({ ids }) => {
  console.log(`values are ${util.inspect(ids)}`);
  return User.findAll({
    where: {'id': {in: ids}},
    order: [
      ['createdAt', 'DESC']
    ]});
};


export default createAnonymousGraphQLQuery(type, args, userFunc);
