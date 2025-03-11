// controllers/adminController.js
import User from '../models/User.js';
import AuditLog from '../models/AuditLog.js';
import City from '../models/City.js';
import Place from '../models/Place.js';
import Review from '../models/Review.js';
import Message from '../models/Message.js';
import mongoose from 'mongoose';

// Utility: Validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Optional: Create an audit log entry for user deletion
    await AuditLog.create({
      action: 'DELETE_USER',
      performedBy: req.user ? req.user.id : null,
      details: `Deleted user with ID ${id}`
    });

    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};

export const banUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findByIdAndUpdate(id, { role: 'banned' }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Optional: Create an audit log entry for banning the user
    await AuditLog.create({
      action: 'BAN_USER',
      performedBy: req.user ? req.user.id : null,
      details: `Banned user with ID ${id}`
    });

    res.status(200).json({ message: 'User banned', user });
  } catch (error) {
    next(error);
  }
};

export const getAnalytics = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    const cityCount = await City.countDocuments();
    const placeCount = await Place.countDocuments();
    const reviewCount = await Review.countDocuments();
    const messageCount = await Message.countDocuments();
    res.status(200).json({ userCount, cityCount, placeCount, reviewCount, messageCount });
  } catch (error) {
    next(error);
  }
};

export const getAuditLogs = async (req, res, next) => {
  try {
    const logs = await AuditLog.find().populate('performedBy');
    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
};
export const getAllPlaces = async (req, res, next) => {
  try {
    const places = await places.find().select('-password');
    res.status(200).json(places);
  } catch (error) {
    next(error);
  }
};

export const getAllCities = async (req, res, next) => {
  try {
    const cities = await cities.find().select('-password');
    res.status(200).json(cities);
  } catch (error) {
    next(error);
  }
};