import { useEffect, useState } from "react";

import RoomItemCard from "../common/RoomItemCard";

// Dummy data

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/rooms`)
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  const featuredRooms = rooms.slice(0, 6);

  // console.log(featuredRooms);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-gray-800 text-3xl font-bold text-center mb-10">
          Featured Rooms
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room, index) => (
            <RoomItemCard key={index} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
