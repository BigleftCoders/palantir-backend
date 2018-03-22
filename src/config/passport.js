const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(
        "accessToken",
        accessToken,
        "refresh",
        refreshToken,
        "profile",
        profile
      );
      done(null, profile);
      // User.findOrCreate({ googleId: profile.id }, (err, user) =>
      //   done(err, user)
      // );
      // done(null, profile);
    }
  )
);
