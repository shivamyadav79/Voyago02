
// models/Message.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  attachments: { type: Array },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });


export const sendContactEmail = async (name, email, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,  // Send message to yourself
    subject: `New Contact Form Message from ${name}`,
    text: `You received a new message from ${name} (${email}):\n\n${message}`
  };
  await transporter.sendMail(mailOptions);
};


export default mongoose.model('Message', messageSchema);
