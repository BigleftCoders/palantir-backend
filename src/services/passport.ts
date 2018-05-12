import { IUserDocument, IUser } from "api/auth/models/user";
import passport from "passport";
// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
import {
  OAuth2Strategy,
  IOAuth2StrategyOption,
  IOAuth2StrategyOptionWithRequest
} from "passport-google-oauth";
import mongoose from "mongoose";
import seedColor from "seed-color";

import "@/api/auth/models/user";

const User: mongoose.Model<IUserDocument> = mongoose.model("User");

export default function passportMiddlewares(): void {
  passport.serializeUser((user: Express.User, done: Function) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done: Function) => {
    try {
      const user: mongoose.Document | null = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  const options: IOAuth2StrategyOption = {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: `${process.env.FRONTEND_BASE_URL}/login`
  };
  passport.use(
    new OAuth2Strategy(
      options,
      async (
        accessToken: any,
        refreshToken: string,
        profile: any,
        done: any
      ) => {
        try {
          const foundedUser: IUserDocument | null = await User.findOne({
            googleId: profile.id
          });

          if (foundedUser) {
            done(null, foundedUser);
          } else {
            const color: string = seedColor(Math.random().toString()).toHex();
            const created: IUserDocument | null = await new User({
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
}
