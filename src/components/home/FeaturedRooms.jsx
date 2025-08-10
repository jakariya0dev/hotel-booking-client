import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingBar from "../common/LoaderBar";
import RoomItemCard from "../common/RoomItemCard";

const FeaturedRooms = () => {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/rooms/top-rated`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        setLoading(false);
      });
  }, []);

  const featuredRooms = rooms.slice(0, 6);

  // console.log(featuredRooms);

  if (loading) return <LoadingBar />;

  if (featuredRooms.length === 0) {
    return (
      <section className="px-4 bg-white mb-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-gray-800 text-3xl font-bold text-center mb-10">
            No Featured Rooms Available
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 bg-white mb-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-gray-800 text-3xl font-bold text-center mb-10">
          Explore Our{" "}
          <span className="underline underline-offset-8 decoration-amber-400 decoration-4">
            Premium
          </span>{" "}
          Suites
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <motion.div
              key={room._id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <RoomItemCard room={room} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
