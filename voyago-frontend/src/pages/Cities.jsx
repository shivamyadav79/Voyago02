import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchCities } from "../api/api";
import LoadingSpinner from "../components/LoadingSpinner";
import Tilt from "react-parallax-tilt";

const CityPage = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getCities = async () => {
      try {
        const data = await fetchCities();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };
    getCities();
  }, []);

  const handleCityClick = (id) => {
    navigate(`/city/${id}`);
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-10 mb-5">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-5 mt-15">Discover Cities</h1>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search cities..."
          className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading ? (
          <p className="text-center text-gray-600"><LoadingSpinner /></p>
        ) : filteredCities.length === 0 ? (
          <p className="text-center text-gray-600">No cities found</p>
        ) : (
          filteredCities.map((city) => (
            <Tilt key={city.id} tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative cursor-pointer overflow-hidden bg-white/60 backdrop-blur-md shadow-xl rounded-xl p-6 transition-all"
                onClick={() => handleCityClick(city.id)}
              >
                <img
                  src={city.image || "/placeholder.jpg"}
                  alt={city.name}
                  className="w-full h-40 object-cover rounded-lg shadow-md"
                />
                <div className="mt-4">
                  <h2 className="text-2xl font-semibold text-gray-800">{city.name}</h2>
                  <p className="text-gray-600 mt-2 text-sm">{city.description.substring(0, 80)}...</p>
                </div>
                <div className="absolute bottom-3 right-3 bg-white/70 px-3 py-1 text-sm rounded-full shadow-md">
                  ⭐ {city.rating || "N/A"}
                </div>
              </motion.div>
            </Tilt>
          ))
        )}
      </div>
    </div>
  );
};

export default CityPage;
