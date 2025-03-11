import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CityHero = ({ city, loading }) => {
  console.log("City Data in Hero:", city);
  console.log("Loading State in Hero:", loading);

  const bannerVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0 },
  };

  return (
    <div
      className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: !loading && city?.image ? `url(${city.image})` : "none",
      }}
    >
      {!loading && city?.image ? (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      ) : (
        <Skeleton height="60vh" width="100%" />
      )}
      <AnimatePresence mode="wait">
        {!loading && city?.name && (
          <motion.h1
            className="relative text-white text-5xl font-bold z-10"
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {city.name || "Unknown City"}
          </motion.h1>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CityHero;