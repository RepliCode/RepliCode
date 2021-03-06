const passport = require('passport');
const router = require('express').Router();
const GithubStrategy = require('passport-github').Strategy;
const { User } = require('../db/models');
module.exports = router;

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  console.log('Github client ID / secret not found. Skipping Github OAuth.');
} else {
  const githubConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK,
    scope: ['user', 'user:email'],
  };

  const strategy = new GithubStrategy(githubConfig, (token, refreshToken, profile, done) => {
    console.log('dis be a prizzof', profile);
    const githubId = profile.id;
    const name = profile.displayName ? profile.displayName : profile.username;
    const email = profile.emails[0].value;
    const imageURL = profile.photos[0].value
      ? profile.photos[0].value
      : 'https://secure.gravatar.com/avatar/90001b4c55a7e19f7a9486823c9e09b4?s=680&d=mm&r=g';
    const bio = profile._json.bio;

    User.findOrCreate({
      where: { githubId },
      defaults: { name, email, bio, imageURL },
    })
      .then(([user]) => done(null, user))
      .catch(done);
  });

  passport.use(strategy);

  router.get('/', passport.authenticate('github'));

  router.get(
    '/callback',
    passport.authenticate('github', {
      successRedirect: '/feed',
      failureRedirect: '/login',
    })
  );
}
