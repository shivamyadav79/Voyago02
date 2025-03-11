import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

// Use the API URL from the environment variable
const BASE_URL = import.meta.env.VITE_API_URL; // Should be: http://localhost:5002/api

const PlacesCarousel = () => {
  const [places, setPlaces] = useState([]);
  const controls = useAnimation();

  // Define the marquee animation variants
  const marqueeVariants = {
    animate: {
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 15, // Adjust scroll speed as desired
          ease: "linear",
        },
      },
    },
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        // The request URL uses the env variable
        const response = await axios.get(`${BASE_URL}/places`);
        console.log("Fetched places:", response.data);
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
    controls.start("animate"); // Start the marquee animation when the component mounts
  }, [controls]);

  // Duplicate the places array for a seamless scrolling effect
  const repeatedPlaces = [...places, ...places];

  return (
    <div className="overflow-hidden w-full relative">
      <h1 className="text-3xl font-bold mt-10 mb-10">Popular Places</h1>
      <motion.div
        className="flex"
        variants={marqueeVariants}
        animate={controls}
        // Pause the animation on hover, resume when mouse leaves
        onHoverStart={() => controls.stop()}
        onHoverEnd={() => controls.start("animate")}
        style={{ whiteSpace: "nowrap" }}
      >
        {repeatedPlaces.map((place, index) => (
          <Link key={index} to={`/places/${place._id}`}>
            <div className="min-w-[250px] m-4 p-4 bg-white rounded shadow flex-shrink-0 cursor-pointer hover:shadow-xl transition-shadow">
              <img
                src={place.imageUrl || "/placeholder.jpg"}
                alt={place.name || "Place Image"}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-bold text-lg">
                {place.name || "Unnamed Place"}
              </h3>
              <p className="text-gray-600">
                {(place.city && place.city.name) || place.city || "Unknown City"}
              </p>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default PlacesCarousel;
