import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const BASE_URL = import.meta.env.VITE_API_URL;

const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/places/${id}`);
        setPlace(response.data);
      } catch (err) {
        setError("Failed to fetch place details");
        console.error("Error fetching place details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaceDetails();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 mt-10 space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900">{place.name}</h2>
        <img
          src={place.images?.[3] || "/placeholder.jpg"}
          alt={place.name}
          className="w-full h-96 object-cover rounded-lg mt-6 shadow-lg"
        />
      </div>
      
      <Section title="Description and History" content={place.description} />
      <LocationSection location={place.location} image={place.images?.[1]} />
      <CategorySection category={place.type} />
      <FamousForSection famous={place.famous} image={place.images?.[0]} />
      <PhotoGrid images={place.images} />
      <Reviews reviews={place.reviews} />
    </div>
  );
};

const Section = ({ title, content }) => (
  <div className="space-y-4">
    <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
    <p className="text-lg text-gray-600 leading-relaxed">{content || "No details available."}</p>
  </div>
);

const LocationSection = ({ location, image }) => (
  <div className="flex flex-col md:flex-row items-center gap-10">
    <div className="md:w-1/2 space-y-2">
      <h3 className="text-3xl font-bold text-gray-900">Location</h3>
      <p className="text-lg text-gray-600">{location?.address || "No location available."}</p>
      <p className="text-lg text-gray-600">{location?.coordinates || "No coordinates available."}</p>
    </div>
    <div className="md:w-1/2">
      <img className="w-full h-80 rounded-lg object-cover shadow-md" src={image || "/placeholder.jpg"} alt="Location" />
    </div>
  </div>
);

const CategorySection = ({ category }) => (
  <div className="flex justify-between items-center border-t pt-6">
    <h1 className="text-3xl font-bold text-gray-900">Category</h1>
    <p className="text-xl font-semibold text-gray-700">{category || "Not categorized"}</p>
  </div>
);

const FamousForSection = ({ famous, image }) => (
  <div className="flex flex-col md:flex-row items-center gap-10">
    <div className="md:w-1/2">
      <img className="w-full h-80 rounded-lg object-cover shadow-md" src={image || "/placeholder.jpg"} alt="Famous place" />
    </div>
    <div className="md:w-1/2 space-y-2">
      <h1 className="text-3xl font-bold text-gray-900">Famous for</h1>
      <p className="text-lg text-gray-600">{famous || "No specific details available."}</p>
    </div>
  </div>
);

const PhotoGrid = ({ images = [] }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-900">Photos</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {images.slice(0, 3).map((img, index) => (
        <img key={index} className="w-full h-60 object-cover rounded-lg shadow-md" src={img || "/placeholder.jpg"} alt={`Photo ${index + 1}`} />
      ))}
    </div>
  </div>
);

const Reviews = ({ reviews = [] }) => {
  const reviewsVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0 },
  };

  return (
    <section className="max-w-5xl mx-auto p-4 md:p-8">
      <motion.div key="reviews" variants={reviewsVariants} initial="hidden" animate="visible" exit="exit">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border-b pb-2">
                <p className="text-gray-800">
                  <strong>{review.user?.name || "Anonymous"}:</strong> {review.comment} {" "}
                  <span className="text-sm text-gray-500">({review.rating}/5)</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews available for this place.</p>
        )}
      </motion.div>
    </section>
  );
};

export default PlaceDetails;
