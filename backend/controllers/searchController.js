// controllers/searchController.js
import City from "../models/City.js";
import Place from "../models/Place.js";

export const searchCitiesAndPlaces = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query)
      return res.status(400).json({ message: "Query parameter is required" });

    const cities = await City.find({ name: new RegExp(query, "i") }).select(
      "id name"
    );
    const places = await Place.find({ name: new RegExp(query, "i") })
      .select("id name city")
      .populate("city", "name");

    const results = [
      ...cities.map((city) => ({ id: city.id, name: city.name, type: "city" })),
      ...places.map((place) => ({
        id: place.id,
        name: place.name,
        type: "place",
        city: place.city ? place.city.name : null,
      })),
    ];

    res.status(200).json(results);
  } catch (error) {
    console.error("Search API error:", error);
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};
