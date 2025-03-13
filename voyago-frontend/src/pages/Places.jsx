import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchPlaces } from "../api/api";
import Tilt from "react-parallax-tilt";

const PLACE_CATEGORIES = [
  "All",
  "Food Place",
  "Hidden Spot",
  "Hospital",
  "Hotel",
  "Restaurant",
  "Shopping",
  "Tourist Attraction",
];

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [modalPlace, setModalPlace] = useState(null);

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const data = await fetchPlaces();
        setPlaces(data);
        setFilteredPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    };
    getPlaces();
  }, []);

  const filterPlaces = (category) => {
    setActiveFilter(category);
    if (category === "All") {
      setFilteredPlaces(places);
    } else {
      setFilteredPlaces(places.filter((place) => place.type === category));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-10 ">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-6 mt-15">Explore Places</h1>
      
      <div className="flex justify-center space-x-4 mb-8 mt-15">
        {PLACE_CATEGORIES.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg text-lg font-semibold transition-all ${
              activeFilter === category
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => filterPlaces(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading ? (
          <p className="text-center text-gray-600">Loading places...</p>
        ) : filteredPlaces.length === 0 ? (
          <p className="text-center text-gray-600">No places found</p>
        ) : (
          filteredPlaces.map((place) => (
            <Tilt key={place.id} tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative cursor-pointer overflow-hidden bg-white/60 backdrop-blur-md shadow-xl rounded-xl p-6 transition-all"
                onClick={() => setModalPlace(place)}
              >
                <img
                  src={place.images?.[0] || "/placeholder.jpg"}
                  alt={place.name}
                  className="w-full h-40 object-cover rounded-lg shadow-md"
                />
                <div className="mt-4">
                  <h2 className="text-2xl font-semibold text-gray-800">{place.name}</h2>
                  <p className="text-gray-600 mt-2 text-sm">{place.description.substring(0, 80)}...</p>
                </div>
                <div className="absolute bottom-3 right-3 bg-white/70 px-3 py-1 text-sm rounded-full shadow-md">
                  ⭐ {place.rating || "N/A"}
                </div>
              </motion.div>
            </Tilt>
          ))
        )}
      </div>

      {modalPlace && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg relative">
            <button className="absolute top-2 right-2 text-gray-600" onClick={() => setModalPlace(null)}>✕</button>
            <img src={modalPlace.image || "/placeholder.jpg"} alt={modalPlace.name} className="w-full h-48 object-cover rounded-lg" />
            <h2 className="text-2xl font-bold mt-4">{modalPlace.name}</h2>
            <p className="text-gray-600 mt-2">{modalPlace.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
