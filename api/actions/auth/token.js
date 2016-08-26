import jwt from 'jsonwebtoken';
import config from '../../../config';

export default async function Token(req) {
  let isExpired = false;
  if (req.headers.authorization) {
    const decoded = await jwt.verify(req.headers.authorization.replace('Bearer ', ''), config.auth.jwt.secret, {ignoreExpiration: true});
    isExpired = (new Date(decoded.exp * 1000) <= Date.now());
  }
  return {expired: isExpired};
}
