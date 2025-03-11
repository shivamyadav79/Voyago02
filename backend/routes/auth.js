// routes/auth.js
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import {
  register,
  login,
  getProfile,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

// Local authentication routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateToken, getProfile);
router.get("/verify-email", verifyEmail);

// Google OAuth: Initiate authentication with proper scopes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["openid", "profile", "email"],
    session: false,
  })
);

// Google OAuth: Callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    if (!req.user) {
      console.error("No user found from Google OAuth");
      return res.redirect("/login");
    }
    // Generate a JWT token using the Mongoose user id
    const token = jwt.sign(
      { id: req.user.id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // Redirect to frontend with token in query parameter
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
  }
);

export default router;
