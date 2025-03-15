import { FaFacebookF, FaTwitter, FaLink } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AboutSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-b from-white to-gray-100 p-10 md:p-20 text-gray-800">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-40 h-40 bg-[#8B5CF6] opacity-20 blur-3xl rounded-full"
          style={{ top: `${20 + scrollY * 0.1}px`, left: "10%" }}
        ></div>
        <div 
          className="absolute w-32 h-32 bg-[#E0AFFF] opacity-25 blur-2xl rounded-full"
          style={{ bottom: `${50 - scrollY * 0.2}px`, right: "15%" }}
        ></div>
      </div>

      {/* Close Button */}
      <motion.button 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.4 }} 
        className="absolute top-6 right-6 border border-gray-300 rounded-full p-2 bg-white/50 backdrop-blur-md hover:bg-gray-100 transition">
        <IoClose className="text-gray-600 text-lg" />
      </motion.button>

      {/* Heading */}
      <motion.h2 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }} 
        className="text-5xl md:text-6xl font-extrabold text-center text-[#8B5CF6] mb-10">
        The Story Behind <br /> <span className="text-gray-800">Voyago</span>
      </motion.h2>

      {/* Story Container */}
      <div className="max-w-5xl mx-auto text-lg leading-relaxed space-y-12">
        
        {/* Chapter 1 */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
          <h3 className="text-3xl font-semibold text-[#8B5CF6]">A Vision That Became a Journey</h3>
          <p className="text-gray-600 mt-4">
            It started as a dream—a dream to build something that wasn’t just another project, 
            but a **living, breathing experience**. Traveling isn’t just about places; it’s about 
            the **stories, the people, and the hidden wonders** that make a city feel like home.
          </p>
        </motion.div>

        {/* Chapter 2 */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}>
          <h3 className="text-3xl font-semibold text-[#8B5CF6]">From Code to Reality</h3>
          <p className="text-gray-600 mt-4">
            Every **line of code**, every **pixel**, and every **interaction** in Voyago was carefully 
            crafted to make users feel **immersed** in a seamless, visually stunning, and emotionally 
            engaging journey. The UI is designed to be **alive**, the chat feels **personal**, and 
            the **experience is unforgettable**.
          </p>
        </motion.div>

        {/* Chapter 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
          <h3 className="text-3xl font-semibold text-[#8B5CF6]">Meet the Creator</h3>
          <p className="text-gray-600 mt-4">
            <span className="font-medium">Shivam Yadav</span>—a developer, designer, and **storyteller through technology**. 
            With an **unwavering passion for creating meaningful digital experiences**, I have spent countless nights 
            refining, iterating, and pushing this project to **perfection**. Every button click, animation, and 
            transition reflects **not just technical mastery, but a love for art and user experience**.
          </p>
        </motion.div>
      </div>

      {/* Elegant Divider */}
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }} 
        animate={{ opacity: 1, scaleX: 1 }} 
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.9 }} 
        className="mt-12 w-full h-1 bg-gradient-to-r from-[#8B5CF6] to-[#E0AFFF] rounded-full"
      ></motion.div>

      {/* Share Section */}
      <div className="text-center mt-10">
        <h3 className="text-2xl font-medium">Share the Story</h3>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="#" className="p-3 border border-gray-300 rounded-full hover:bg-gray-200 transition">
            <FaFacebookF className="text-gray-700" />
          </a>
          <a href="#" className="p-3 border border-gray-300 rounded-full hover:bg-gray-200 transition">
            <FaTwitter className="text-gray-700" />
          </a>
          <a href="#" className="p-3 border border-gray-300 rounded-full hover:bg-gray-200 transition">
            <FaLink className="text-gray-700" />
          </a>
        </div>
      </div>
    </div>
  );
}
