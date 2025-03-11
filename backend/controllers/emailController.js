// controllers/emailController.js
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from "../utils/email.js";

export const sendEmail = async (req, res, next) => {
  try {
    // Depending on your use-case, you might differentiate between email types.
    const { type, user, token } = req.body;

    if (type === "verification") {
      await sendVerificationEmail(user, token);
    } else if (type === "reset") {
      await sendResetPasswordEmail(user, token);
    } else {
      return res.status(400).json({ message: "Invalid email type" });
    }

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    next(error);
  }
};
