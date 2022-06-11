const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20');

// set it up and tell app we want to use google strategy

passport.use(
  new GoogleStrategy({
    // options for the google strategy
  }),
  () => {
    // passport callback fucntion
  }
);
