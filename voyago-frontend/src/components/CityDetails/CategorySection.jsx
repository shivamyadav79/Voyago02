import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bed, ForkKnifeCrossed, Hospital, MapPin, EyeOff } from "lucide-react";

// Optional icons mapping for each category
const categoryIcons = {
  hotel: Bed,
  restaurant: ForkKnifeCrossed,
  hospital: Hospital,
  "tourist-attraction": MapPin,
  "hidden-spot": EyeOff,
};

const IconForCategory = ({ type, className }) => {
  const Icon = categoryIcons[type];
  return Icon ? <Icon className={className} /> : null;
};

const CategorySection = ({ category, places, cityId }) => {
  if (!places.length) return null;

  return (
    <motion.div
      key={category}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { duration: 0.7 } }}
      exit={{ opacity: 0 }}
      className="mb-8"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <IconForCategory type={category} className="w-8 h-8" />
          <h3 className="text-xl font-semibold capitalize">
            {category.replace(/-/g, " ")}
          </h3>
        </div>
        <Link
          to={`/cities/${cityId}/places?category=${category}`}
          className="text-blue-600 hover:underline"
        >
          View More
        </Link>
      </div>
      <div className="overflow-x-auto flex space-x-4 py-2">
        {places.map((place) => (
          <Link
            key={place._id}
            to={`/places/${place._id}`}
            className="min-w-[200px] flex-shrink-0 bg-white rounded shadow p-4 hover:shadow-lg transition-shadow"
          >
            <img
              src={place.imageUrl || "/placeholder.jpg"}
              alt={place.name}
              className="w-full h-32 object-cover rounded"
            />
            <h4 className="mt-2 font-bold">{place.name}</h4>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default CategorySection;
