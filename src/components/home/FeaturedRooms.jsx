import { useEffect, useState } from "react";
import { Link } from "react-router";
import { RenderStars } from "../../utils/RatingHelper";

// Dummy data

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/rooms`)
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  const featuredRooms = rooms.slice(0, 6);

  console.log(featuredRooms);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Rooms</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">{room.name}</h3>
                  <span className="text-blue-600 font-bold text-lg">
                    ${room.price}
                    <span className="text-sm font-normal text-gray-500">
                      {" "}
                      /night
                    </span>
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">{room.description}</p>

                {/* Ratings */}
                <div className="flex items-center mb-4">
                  {RenderStars(room.rating)}
                  <span className="ml-2 text-sm text-gray-500">
                    ({room.rating}/5)
                  </span>
                </div>

                {/* Features */}
                <ul className="text-sm text-gray-500 mb-4 list-disc list-inside">
                  {room.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>

                {/* Book Now Button */}
                <Link
                  to={`/room/${room._id}`}
                  className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
