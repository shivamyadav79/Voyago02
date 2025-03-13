import React, { useEffect, useState } from "react";
import { fetchPlaces } from "../../api/api.js";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

const PlacesCarousel = () => {
  const [places, setPlaces] = useState([]);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const data = await fetchPlaces();
        setPlaces([...data, ...data]); // Duplicate for infinite loop
      } catch (error) {
        console.error("Failed to fetch places");
      }
    };

    getPlaces();
  }, []);

  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: ["0%", "-100%"],
        transition: {
          ease: "linear",
          duration: 20,
          repeat: Infinity,
        },
      });
    } else {
      controls.stop();
    }
  }, [isHovered, controls]);

  return (
    <div className="overflow-hidden w-full relative mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Popular Places</h1>
      <div
        className="w-full overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex space-x-4"
          animate={controls}
        >
          {places.map((place, index) => (
            <Link key={index} to={`/places/${place._id}`}>
              <div className="min-w-[250px] m-2 p-4 bg-white rounded-lg shadow-lg flex-shrink-0">
                <img
                  src={place.images?.[0] || "/placeholder.jpg"}
                  alt={place.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="mt-2 font-bold text-lg">{place.name}</h3>
                <p className="text-gray-600">{place.city?.name || "Unknown City"}</p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PlacesCarousel;
