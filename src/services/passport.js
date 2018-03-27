const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const mongoose = require("mongoose");

require("../api/auth/models/user");

const User = mongoose.model("User");

passport.serializeUser((user, done) => {
  console.log("serializeUSer", user, user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log("deserializeUSer", id);
    const user = await User.findById(id);
    console.log("deserializeUser", user);
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
      callbackURL: "http://localhost:3000/login"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("accessToken", accessToken, "refreshTOken", refreshToken);
        const foundedUser = await User.findOne({
          googleId: profile.id
        });

        if (foundedUser) {
          done(null, foundedUser);
        } else {
          const created = await new User({
            googleId: profile.id,
            displayName: profile.displayName
          }).save();
          done(null, created);
        }
      } catch (error) {
        throw error;
      }
    }
  )
);
