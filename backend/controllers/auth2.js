// import User from "../models/User.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// // ✅ Register User
// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     user = new User({ name, email, password: hashedPassword });

//     await user.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // ✅ Login User
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });


//     res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

//     res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // ✅ Get Profile
// export const getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching profile" });
//   }
// };

// // ✅ Verify Email (Placeholder)
// export const verifyEmail = async (req, res) => {
//   res.json({ message: "Email verification not implemented yet" });
// };

// // ✅ Forgot Password (Placeholder)
// export const forgotPassword = async (req, res) => {
//   res.json({ message: "Forgot password not implemented yet" });
// };

// // ✅ Reset Password (Placeholder)
// export const resetPassword = async (req, res) => {
//   res.json({ message: "Reset password not implemented yet" });
// };
