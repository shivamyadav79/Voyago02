// controllers/auth.controller.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// ✅ Utility function for email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ✅ Register User
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Incoming Registration Data:", { name, email, password });

    // **Validation Checks**
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    let user = await User.findOne({ email });
    if (user) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // **Hash Password & Save User**
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password Before Saving:", hashedPassword);

    user = new User({ username: name, email, password: hashedPassword });

    await user.save();
    console.log("User registered successfully:", user);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login Attempt:", { email, password });

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("Stored Password in DB:", user.password);

    // ✅ Ensure bcrypt.compare() gets the raw password
    const isMatch = bcrypt.compare(password, user.password);

    console.log("Password Match:", isMatch);

    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict"
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// ✅ Get Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// ✅ Verify Email (Placeholder)
export const verifyEmail = async (req, res) => {
  res.json({ message: "Email verification not implemented yet" });
};

// ✅ Forgot Password (Placeholder)
export const forgotPassword = async (req, res) => {
  res.json({ message: "Forgot password not implemented yet" });
};

// ✅ Reset Password (Placeholder)
export const resetPassword = async (req, res) => {
  res.json({ message: "Reset password not implemented yet" });
};
