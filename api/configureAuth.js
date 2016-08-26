import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {Strategy as LocalStrategy} from 'passport-local';
import {User, UserClaim, comparePassword} from './database/models';
import jwt from 'jsonwebtoken';
import util from 'util';
import config from '../config';

function generateJWTToken(req, res, next){
  req.token =  jwt.sign({ id: req.user.id }, config.auth.jwt.secret, {
    expiresIn: 31536000
  });
  next();
}

const configure = (app, config) => {

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/login/facebook', passport.authenticate('facebook'));

  app.get('/login/facebook/return',
    passport.authenticate('facebook', {failureRedirect: '/login'}), generateJWTToken,
    function (req, res) {
      req.session['token'] = req.token;
      res.redirect(`http://${config.host}:${config.port}/timeline`);
    }
  );

  app.post('/login', passport.authenticate('local', { session: false }), generateJWTToken, (req, res) => {
    res.status(200).json({user: req.user, token: req.token});
  });

  app.use('/logout', (req, res) => {
    req.session.destroy(() => {
      req.session = null;
      req.user = null;
      res.status(200).json({message: "Successfully logged out"});
    });
  });

  // Authentication
  passport.use(new FacebookStrategy({
      clientID: config.auth.facebook.id,
      clientSecret: config.auth.facebook.secret,
      callbackURL: '/api/login/facebook/return',
      passReqToCallback: true,
      profileFields: ['id', 'emails', 'name', 'displayName', 'gender']
    },
    function (req, accessToken, refreshToken, profile, done) {
      const claimType = 'urn:facebook:access_token';

      if (profile) {
        // Look up user by profile id
        User.findOne({
          where: {profileType: profile.provider, profileId: profile.id}
        }).then((user) => {

          if (user) {
            // Return the user
            done(null, user.toJSON());
          } else { // Create a new user in the user table if not found
             var newUser = {
               name: profile.displayName,
               email: profile.emails[0].value,
               profileId: profile.id,
               profileType: profile.provider,
               gender: profile.gender,
               picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
               claims: [
                 {type: claimType, value: profile.id}
               ]
             };
             console.log(`New user based on FB profile is ${util.inspect(newUser)}`);

             User.create(newUser, {
               include: [
                 {model: UserClaim, as: 'claims'}
               ]
             }).then((user) => {
               // Return the user
               done(null, user.toJSON());
             });
         }
       });
      }
    }
  ));

  passport.use(new LocalStrategy({ usernameField: 'email' }, function (username, password, done) {
    console.log(`execute local strategy`);
    User.findOne({ where: {email: username} }).then((user) => {
      if (!user) return done(new Error('Authentication failed. User not found.'));

      if (comparePassword(password, user.passwordHash)) {
        done(null, user);
      }
      else {
        done(new Error(`passwords do not match for user ${username}.`), false);
      }
    });
  }));

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
};

export {configure as default, generateJWTToken};