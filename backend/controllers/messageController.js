
// controllers/messageController.js
import Message from '../models/Message.js';

export const getChatHistory = async (req, res) => {
  try {
    const messages = await Message.find({ city: req.params.cityId }).sort({ createdAt: 1 }).populate('user');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch chat history', error: error.message });
  }
};
export const sendChatMessage = async (req, res) => {
  try {
    const { userId, content } = req.body;
    if (!userId || !content) {
      return res.status(400).json({ message: 'User ID and message content are required' });
    }

    const message = await Message.create({
      city: req.params.cityId,
      user: userId,
      content: content,
    });

    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
};