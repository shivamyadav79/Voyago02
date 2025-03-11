import express from "express";
import { sendContactEmail } from "../utils/email.js"; // Import email utility

const router = express.Router();

// Contact form submission route
router.post("/", async (req, res) => {
  console.log("Incoming Data:", req.body); // Debugging

  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    console.error("Missing Fields:", { firstName, lastName, email, message });
    return res.status(400).json({ error: "All fields are required" });
  }

  const fullName = `${firstName} ${lastName}`;

  try {
    await sendContactEmail(fullName, email, message);
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;
