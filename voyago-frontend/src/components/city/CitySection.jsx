import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Use environment variable for the API URL if available
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5002/api";

const CitySection = () => {
  const [cities, setCities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch all cities from /cities/get-cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/cities/get-cities`);
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  // Auto-switch city every 4 seconds
  useEffect(() => {
    if (cities.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % cities.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [cities]);

  const currentCity = cities[currentIndex] || {};
  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // If a valid city ID exists, wrap the content in a Link for navigation.
  return (
    <section className="relative w-full max-w-7xl mx-auto py-8 flex flex-col md:flex-row items-center gap-6">
      {currentCity._id ? (
        <Link to={`/cities/${currentCity._id}`} className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCity._id + "-text"}
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <h3 className="text-xl font-semibold mb-2">
                {currentCity.name || "Unknown City"}
              </h3>
              <p className="text-gray-700">
                {currentCity.description ||
                  "No description available for this city."}
              </p>
            </motion.div>
          </AnimatePresence>
        </Link>
      ) : (
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">Unknown City</h3>
          <p className="text-gray-700">
            No description available for this city.
          </p>
        </div>
      )}

      {currentCity._id ? (
        <Link to={`/cities/${currentCity._id}`} className="flex-1 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCity._id + "-img"}
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full md:w-auto"
            >
              <img
                src={currentCity.imageUrl || "/placeholder.jpg"}
                alt={currentCity.name || "City Image"}
                className="object-cover rounded w-full md:w-[400px] h-auto shadow"
              />
            </motion.div>
          </AnimatePresence>
        </Link>
      ) : (
        <div className="flex-1 flex justify-center">
          <img
            src="/placeholder.jpg"
            alt="City"
            className="object-cover rounded w-full md:w-[400px] h-auto shadow"
          />
        </div>
      )}
    </section>
  );
};

export default CitySection;
