import React from "react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ReviewsSection = ({ reviews, loading }) => {
  const reviewsVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0 },
  };

  return (
    <section className="max-w-5xl mx-auto p-4 md:p-8">
      {loading ? (
        <Skeleton count={3} height={20} className="mb-2" />
      ) : (
        <motion.div
          key="reviews"
          variants={reviewsVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
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
        </motion.div>
      )}
    </section>
  );
};

export default ReviewsSection;
