const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../api/auth/models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("=================");
        console.log("accessToken", accessToken);
        console.log("=================");
        console.log(profile);
        const foundedUser = User.findOne({
          googleId: profile.id
        });
        if (foundedUser) {
          done(null, foundedUser);
        } else {
          const created = new User({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
          }).save();
          done(null, created);
        }
      } catch (error) {
        throw error;
      }

      // User.findOrCreate({ googleId: profile.id }, (err, user) =>
      //   done(err, user)
      // );
      // done(null, profile);
    }
  )
);
