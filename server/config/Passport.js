import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/user.js";
import jwt from "jsonwebtoken"; 

// 🔥 GOOGLE
passport.use(
  new GoogleStrategy(
    {
      clientID: "626280928724-vmdehg5m6dqhhdlcfivdmcp57s85brkp.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (_, __, profile, done) => {
      let user = await User.findOne({ email: profile.emails[0].value });

      if (!user) {
        user = await User.create({
          email: profile.emails[0].value,
          username: profile.id,
        });
      }

      return done(null, user);
    }
  )
);

// 🔥 GITHUB
passport.use(
  new GitHubStrategy(
    {
      clientID: "Ov23liJXeRQzt8BNiBvW",
      clientSecret: "9f41b8a05c86c4b27eaf9155cc3d7928570c2b33",
      callbackURL: "/api/auth/github/callback",
    },
    async (_, __, profile, done) => {
      let user = await User.findOne({ username: profile.username });

      if (!user) {
        user = await User.create({
          username: profile.username,
        });
      }

      return done(null, user);
    }
  )
);

export default passport;