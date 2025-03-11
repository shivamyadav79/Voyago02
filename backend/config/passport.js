// config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,           // From your .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,       // From your .env
      callbackURL: process.env.GOOGLE_CALLBACK_URL,         // e.g., http://localhost:5001/api/auth/google/callback
      // Do NOT include a "scope" property here
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find an existing user by googleId or email
        let user = await User.findOne({ $or: [{ googleId: profile.id }, { email: profile.emails[0].value }] });
        if (!user) {
          // Create new user if not found
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          });
          await user.save();
        } else if (!user.googleId) {
          // If user exists (registered locally) but doesn't have a googleId, update it
          user.googleId = profile.id;
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
