import { motion } from "framer-motion";
import { Link } from "react-router";

const CallToAction = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-6 shadow-lg text-center">
      <motion.p
        animate={{ scale: [1, 0.8, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="text-2xl font-semibold text-white mb-6"
      >
        Book Early & Save 20%
      </motion.p>
      <h2 className="text-4xl md:text-4xl font-seminibold mb-4">
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
