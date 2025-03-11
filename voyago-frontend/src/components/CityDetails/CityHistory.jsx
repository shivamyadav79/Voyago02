import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CityHistory = ({ city, loading }) => {
  const historyVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    exit: { opacity: 0 },
  };

  return (
    <section className="max-w-5xl mx-auto p-4 md:p-8">
      {loading ? (
        <Skeleton count={3} height={20} className="mb-2" />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={city?._id}
            variants={historyVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-3xl font-bold mb-4">History & Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {city?.history ||
                city?.description ||
                "No detailed information available."}
            </p>
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
};

export default CityHistory;
