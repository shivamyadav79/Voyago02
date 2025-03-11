import React, { use, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Bed, ForkKnifeCrossed, Hospital, MapPin, EyeOff } from "lucide-react";

// Use environment variable for API URL (e.g., VITE_API_URL=http://localhost:5002/api)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5002/api";

// Define categories you expect in the Place documents
// const categories = [
//   "hotel",
//   "restaurant",
//   "hospital",
//   "tourist-attraction",
//   "hidden-spot",
// ];

// Helper component for category icons (if needed)
const IconForCategory = ({ type, className }) => {
  switch (type) {
    case "hotel":
      return <Bed className={className} />;
    case "restaurant":
      return <ForkKnifeCrossed className={className} />;
    case "hospital":
      return <Hospital className={className} />;
    case "tourist-attraction":
      return <MapPin className={className} />;
    case "hidden-spot":
      return <EyeOff className={className} />;
    default:
      return null;
  }
};

const CityDetails = () => {
  const { id } = useParams(); // city id from URL
  console.log("City ID from URL:", id); // Debug: Check the id
  const [city, setCity] = useState(null);
  const [places, setPlaces] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch city details: GET /cities/:id
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/cities/${id}`);
        setCity(res.data);
      } catch (error) {
        console.error("Error fetching city:", error);
      }
    };
    fetchCity();
  }, [id]);

  const [categories, setCategories] = useState(null);

  // Fetch places for the city: GET /places?city=<id>
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/places?city=${id}`);
        console.log("Fetched places:", res.data); // Debug: Inspect returned places array
        console.log(categories);
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    fetchPlaces();
  }, []);

  // Fetch reviews for the city: GET /reviews?city=<id>
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/reviews?city=${id}`);
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading city details...</p>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>City not found.</p>
      </div>
    );
  }

  // Destructure city fields
  const { name, imageUrl, description, history } = city;

  // Framer Motion fade variants
  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Group places by category from the fetched places array
  // Group places by category (Ensure matching formats)
  const placesByCategory = {};
  categories?.forEach((cat) => {
    placesByCategory[cat] = places.filter(
      (p) => p.category?.toLowerCase().replace(/\s+/g, "-") === cat
    );
  });
  console.log("Places by Category:", placesByCategory); // Debug: Ensure grouping is correct

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div
        className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${imageUrl || "/placeholder.jpg"})` }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <AnimatePresence mode="wait">
          <motion.h1
            className="relative text-white text-5xl font-bold z-10"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}
          >
            {name || "Unknown City"}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* History & Description */}
      <section className="max-w-5xl mx-auto p-4 md:p-8">
        <h2 className="text-3xl font-bold mb-4">History & Description</h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={city._id}
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <p className="text-gray-700 leading-relaxed">
              {history || description || "No detailed information available."}
            </p>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Local Attractions Section */}
      <section className="max-w-5xl mx-auto p-4 md:p-8">
  <h2 className="text-2xl font-bold mb-4">Local Attractions</h2>
  {categories?.map((cat) => {
    const catPlaces = placesByCategory[cat];
    if (!catPlaces || !catPlaces.length) return null;

    // Log the category for debugging
    console.log(cat);

    return (
      <div key={cat} className="mb-8">
        <div className="h2">{cat.replace(/-/g, " ")}</div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <IconForCategory type={cat} className="w-8 h-8" />
            <h3 className="text-xl font-semibold capitalize">
              {cat.replace(/-/g, " ")}
            </h3>
          </div>
          <Link
            to={`/cities/${id}/places?category=${cat}`}
            className="text-blue-600 hover:underline"
          >
            View More
          </Link>
        </div>
        <div className="overflow-x-auto flex space-x-4 py-2">
          {catPlaces?.map((place) => (
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
      </div>
    );
  })}
        </section>
      {/* Reviews Section */}
      <section className="max-w-5xl mx-auto p-4 md:p-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border-b pb-2">
                <p className="text-gray-800">
                  <strong>{review.user?.name || "Anonymous"}:</strong>{" "}
                  {review.comment}{" "}
                  <span className="text-sm text-gray-500">
                    ({review.rating}/5)
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews available for this city.</p>
        )}
      </section>
    </div>
  );
};

export default CityDetails;
