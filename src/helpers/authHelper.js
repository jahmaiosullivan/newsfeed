import cookie from 'react-cookie';
const userCookieName = 'loginResult';

export const removeBearerAuthToken = () => {
  cookie.remove( userCookieName );
};

export const saveBearerAuthToken = (token) => {
  if (token) {
    cookie.save( userCookieName, token );
  }
};

export const getBearerAuthToken = () => {
  let cookieVal;
  if (__SERVER__ && cookie) {
    cookieVal = cookie.load( userCookieName );
  }

  if (!__SERVER__) {
    cookieVal = window.reactCookie.load( userCookieName );
  }

  return cookieVal ? 'Bearer ' + cookieVal.token : '';
};
