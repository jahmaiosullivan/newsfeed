import util from 'util';
import {User} from '../../database/models';
import config from '../../../config';

export default async function loadAuth(req) {
  let user = null;
  const token = req.token || req.session.token;
  if (req.user) {
    user = await User.findOne({where: {id: req.user.id}});
    if (user) {
      user = user.toJSON();
      return {user, token};
    }
  }
  return {token};
}
