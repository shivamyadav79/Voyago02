import { FaFacebookF, FaTwitter, FaLink } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function AboutSection() {
  return (
    <div className="bg-black text-white p-8 md:p-16 font-serif relative">
      <button className="absolute top-6 right-6 border border-gray-500 rounded-full p-2 hover:bg-gray-800">
        <IoClose className="text-white text-lg" />
      </button>
      <h2 className="text-4xl text-[#D4A373] mb-6">About this Project</h2>
      <p className="text-lg mb-6 max-w-3xl">
      Developing an interactive city-based tourism web app.
      Implementing dynamic UI components and backend API integrations.
      Ensuring performance optimization for seamless user interaction.      </p>
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl mb-2">Learn More</h3>
          <ul className="space-y-1">
            <li><a href="#" className="text-[#D4A373] hover:underline">Visit the project</a></li>
            <li><a href="#" className="text-[#D4A373] hover:underline">Project highlights</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl mb-2">Project Team</h3>
          <p>Shivam Yadav (Solo Project)</p>
        </div>
        <div>
          <h3 className="text-xl mb-2">Special Thanks</h3>
          <p>Pawan Sir (mentor)</p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl mb-3">Share this experience</h3>
        <div className="flex space-x-4">
          <a href="#" className="p-3 border border-gray-500 rounded-full hover:bg-gray-800">
            <FaFacebookF className="text-white" />
          </a>
          <a href="#" className="p-3 border border-gray-500 rounded-full hover:bg-gray-800">
            <FaTwitter className="text-white" />
          </a>
          <a href="#" className="p-3 border border-gray-500 rounded-full hover:bg-gray-800">
            <FaLink className="text-white" />
          </a>
        </div>
      </div>
    </div>
  );
}
