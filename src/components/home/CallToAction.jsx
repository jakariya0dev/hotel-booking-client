import { Link } from "react-router";

const CallToAction = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-6 shadow-lg text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready for a Relaxing Getaway?
      </h2>
      <p className="text-lg mb-6 max-w-2xl mx-auto">
        Discover beautiful rooms, world-class service, and unforgettable
        experiences. Your perfect escape is just a few clicks away.
      </p>
      <Link
        to="/rooms"
        className="inline-block bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg shadow hover:bg-gray-100 transition"
      >
        Book Your Stay
      </Link>
    </div>
  );
};

export default CallToAction;
