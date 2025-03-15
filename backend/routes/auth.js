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
  logout,  // ✅ Added logout
} from "../controllers/authController.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

// ✅ Local Authentication Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);  // ✅ Added logout
router.get("/me", authenticateToken, getProfile);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// ✅ Google OAuth: Initiate authentication
router.get("/google", passport.authenticate("google", { scope: ["openid", "profile", "email"], session: false }));

// ✅ Google OAuth: Callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: process.env.FRONTEND_URL + "/login-failed" }),
  (req, res) => {
    if (!req.user) return res.redirect(process.env.FRONTEND_URL + "/login");

    const token = jwt.sign({ id: req.user.id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // ✅ Securely store token in HttpOnly Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    res.redirect(process.env.FRONTEND_URL);
  }
);

export default router;
