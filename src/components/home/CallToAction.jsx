import { motion } from "framer-motion";
import { Link } from "react-router";

const CallToAction = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-gray-200 py-16 px-6 shadow-lg text-center">
      <p
        
        className="text-2xl text-white font-semibold mb-6"
      >
        Book Early & Save <span className="bg-amber-400 px-2 rounded">20%</span>
      </p>
      <h2 className="text-4xl md:text-4xl text-gray-100 font-seminibold mb-4">
        Ready for a Relaxing Getaway?
      </h2>

      <p className="text-lg mb-6 max-w-2xl mx-auto">
        Discover beautiful rooms, world-class service, and unforgettable
        experiences. Your perfect escape is just a few clicks away.
      </p>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/rooms"
          className="inline-block bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Book Your Stay
        </Link>
      </motion.button>
    </div>
  );
};

export default CallToAction;
