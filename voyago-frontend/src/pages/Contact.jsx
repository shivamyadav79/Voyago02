import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCat } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [hover, setHover] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      await axios.post("http://localhost:5002/api/contact", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setSuccess("Message sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 40 - 20;
    const y = ((e.clientY - top) / height) * 40 - 20;
    setMousePos({ x, y });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-gray-200 relative">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="p-3 w-full bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="p-3 w-full bg-gray-50 border border-gray-300 rounded-lg text-gray-800 h-32 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          ></textarea>

          {/* BUTTON + CAT */}
          <div className="relative flex justify-center">
            {/* Cat Animation */}
            {hover && (
              <motion.div
                className="absolute flex flex-col items-center z-50"
                initial={{ scale: 0, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: -40, opacity: 1 }}
                exit={{ scale: 0, y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 10 }}
              >
                {/* Cat Face */}
                <FaCat className="text-gray-800 text-4xl" />

                {/* Left Paw */}
                <motion.div
                  className="w-6 h-6 bg-gray-800 rounded-full absolute -bottom-4 -left-6"
                  animate={{ x: mousePos.x, y: mousePos.y }}
                  transition={{ type: "spring", stiffness: 150, damping: 10 }}
                />

                {/* Right Paw */}
                <motion.div
                  className="w-6 h-6 bg-gray-800 rounded-full absolute -bottom-4 -right-6"
                  animate={{ x: -mousePos.x, y: mousePos.y }}
                  transition={{ type: "spring", stiffness: 150, damping: 10 }}
                />
              </motion.div>
            )}

            {/* Send Message Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300 relative overflow-hidden"
              disabled={loading}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onMouseMove={handleMouseMove}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
        {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Contact;
