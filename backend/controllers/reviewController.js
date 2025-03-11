
// controllers/reviewController.js
import Place from '../models/Place.js'; // Adjust the path if necessary
import User from '../models/User.js'; // Import User model as well
import Review from '../models/Review.js';

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user').populate('place');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('user').populate('place');
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch review', error: error.message });
  }
};

export const getReviewsByPlace = async (req, res) => {
  try {
    const reviews = await Review.find({ place: req.params.placeId }).populate('user');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { placeId, rating, comment, userEmail } = req.body; // Only placeId, not cityId

    if (!placeId || !rating || !userEmail) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const place = await Place.findById(placeId);
    if (!place) {
      return res.status(400).json({ message: "Place not found" });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const review = new Review({
      place: place._id,  // Use place ObjectId
      user: user._id,    // Use user ObjectId
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: "Review created", review });

  } catch (error) {
    console.error("Review creation error:", error);
    res.status(500).json({ message: "Review creation failed", error: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json({ message: 'Review updated', review });
  } catch (error) {
    res.status(500).json({ message: 'Review update failed', error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Review deletion failed', error: error.message });
  }
};
