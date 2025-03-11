import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const images = [
  "/images/w9.jpg",
  "/images/w8.jpg",
  "/images/w7.jpg",
  "/images/w6.jpg",
  "/images/w5.jpg",
  "/images/w4.jpg",
  "/images/w3.jpg",
  "/images/w2.jpg",
  "/images/w1.jpg",
  "/images/s1.jpg",
  "/images/s2.jpg",
  "/images/s3.jpg",
  "/images/s4.jpg",
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        <motion.img
          key={index}
          src={images[index]}
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-opacity-40 flex flex-col items-start justify-center px-10">
        <h1 className="text-white text-6xl font-bold drop-shadow-lg">Voyago</h1>
        <p className="text-white text-lg mt-4 font-semibold max-w-lg drop-shadow-lg">
          Your one-step stop to finding all the information about the cities you
          are visiting.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
