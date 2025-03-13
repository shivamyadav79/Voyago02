
// controllers/placeController.js
import Place from '../models/Place.js';
import mongoose from 'mongoose';
export const getAllPlaces = async (req, res) => {
  try {
    // Validate city ID if provided
    let query = {};
    if (req.query.city) {
      if (!mongoose.Types.ObjectId.isValid(req.query.city)) {
        return res.status(400).json({ message: 'Invalid city ID' });
      }
      query = { city: new mongoose.Types.ObjectId(req.query.city) };
    }
    const places = await Place.find(query).populate('city');
    
    res.status(200).json(places);
  } catch (error) {
    console.error("Error in getAllPlaces:", error);
    res.status(500).json({ message: 'Failed to fetch places', error: error.message });
  }
};

export const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id).populate('city');
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch place', error: error.message });
  }
};

export const searchPlaceByName = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "Query parameter is required" });

    // Search Places using case-insensitive regex
    const places = await Place.find({ name: { $regex: query, $options: "i" } }).populate("city");

    // Format results
    const results = places.map(place => ({
      id: place._id,
      name: place.name,
      city: place.city.name, // Include city name for better context
      type: "place",
    }));

    res.status(200).json(results);
  } catch (error) {
    console.error("Search API error:", error);
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};


export const createPlace = async (req, res) => {
  try {
    const place = new Place(req.body);
    await place.save();
    res.status(201).json({ message: 'Place created', place });
  } catch (error) {
    res.status(500).json({ message: 'Place creation failed', error: error.message });
  }
};

export const updatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.status(200).json({ message: 'Place updated', place });
  } catch (error) {
    res.status(500).json({ message: 'Place update failed', error: error.message });
  }
};

export const deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.status(200).json({ message: 'Place deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Place deletion failed', error: error.message });
  }
};

export const getPlacesByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    console.log("Fetching places for cityId:", cityId); // ✅ Debugging Log

    if (!mongoose.Types.ObjectId.isValid(cityId)) {
      return res.status(400).json({ message: "Invalid city ID" });
    }

    const places = await Place.find({ city: cityId }).populate("city");
    
    if (!places.length) {
      return res.status(404).json({ message: "No places found for this city." });
    }

    console.log("Found places:", places); // ✅ Debugging Log
    res.status(200).json(places);
  } catch (error) {
    console.error("Error fetching places by city:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


