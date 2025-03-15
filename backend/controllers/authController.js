import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// ✅ Register User with Email Verification
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    if (!isValidEmail(email))
      return res.status(400).json({ message: "Invalid email format" });

    if (password.length < 6)
      return res.status(400).json({ message: "Password must be at least 6 characters" });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username: name, email, password: hashedPassword, isVerified: false });

    await user.save();

    // Generate verification token
    const verificationToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Send verification email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      text: `Click the link to verify your email: ${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "User registered successfully. Check your email for verification." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Verify Email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) return res.status(400).json({ message: "Token is required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(400).json({ message: "Invalid token" });
    if (user.isVerified) return res.status(400).json({ message: "Email is already verified" });

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Resend Verification Email
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!isValidEmail(email))
      return res.status(400).json({ message: "Invalid email format" });

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "Email is already verified" });

    const verificationToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email - Resend",
      text: `Click the link to verify your email: ${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Verification email resent successfully." });
  } catch (error) {
    console.error("Resend verification error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Login User
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Check if password is correct
    const isMatch =  bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email before logging in." });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get User Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      text: `Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset link sent successfully" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(400).json({ message: "Invalid token" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Logout User
export const logout = async (req, res) => {
  req.logout();
  res.clearCookie("token");
  res.status(200).send({ message: "Logged out successfully" });
};
