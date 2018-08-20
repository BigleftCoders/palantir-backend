const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const mongoose = require("mongoose");
const seedColor = require("seed-color");

require("../api/auth/models/user");

const User = mongoose.model("User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.FRONTEND_BASE_URL}/login`
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const foundedUser = await User.findOne({
          googleId: profile.id
        });

        if (foundedUser) {
          done(null, foundedUser);
        } else {
          const color = seedColor(Math.random()).toHex();
          const created = await new User({
            googleId: profile.id,
            displayName: profile.displayName,
            color
          }).save();
          done(null, created);
        }
      } catch (error) {
        throw error;
      }
    }
  )
);
