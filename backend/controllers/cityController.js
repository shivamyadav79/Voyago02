// controllers/cityController.js
import City from '../models/City.js';

// Public Endpoints
export const getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cities', error: error.message });
  }
};

export const getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) return res.status(404).json({ message: 'City not found' });
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch city', error: error.message });
  }
};

export const searchCityByName = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "Query parameter is required" });

    // Search Cities and Places using case-insensitive regex
    const cities = await City.find({ name: { $regex: query, $options: "i" } });
    const places = await Place.find({ name: { $regex: query, $options: "i" } });

    // Format Results: Include type to differentiate cities and places
    const results = [
      ...cities.map(city => ({ id: city._id, name: city.name, type: "city" })),
      ...places.map(place => ({ id: place._id, name: place.name, type: "place" })),
    ];

    res.status(200).json(results);
  } catch (error) {
    console.error("Search API error:", error);
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};

// Admin Endpoints
export const createCity = async (req, res) => {
  try {
    const city = new City(req.body);
    await city.save();
    res.status(201).json({ message: 'City created', city });
  } catch (error) {
    res.status(500).json({ message: 'City creation failed', error: error.message });
  }
};

export const updateCity = async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!city) return res.status(404).json({ message: 'City not found' });
    res.status(200).json({ message: 'City updated', city });
  } catch (error) {
    res.status(500).json({ message: 'City update failed', error: error.message });
  }
};

export const deleteCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) return res.status(404).json({ message: 'City not found' });
    res.status(200).json({ message: 'City deleted' });
  } catch (error) {
    res.status(500).json({ message: 'City deletion failed', error: error.message });
  }
};
