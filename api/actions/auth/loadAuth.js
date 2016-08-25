import util from 'util';

export default function loadAuth(req) {
  return Promise.resolve({user: req.session.user || req.user || null, token: req.token || req.session.token});
}
