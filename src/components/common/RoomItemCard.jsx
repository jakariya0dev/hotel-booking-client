import { Link } from "react-router";
import { RenderStars } from "../../utils/RatingHelper";

export default function RoomItemCard({ room }) {
  return (
    <Link to={`/room/${room._id}`}>
      <div key={room.id} className="rounded-lg shadow-2xl overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-72 object-cover"
        />
        <div className="p-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-800 text-xl font-semibold">{room.name}</h3>
            <span className="text-blue-600 font-bold text-lg">
              ${room.price}
              <span className="text-sm font-normal text-gray-400"> /night</span>
            </span>
          </div>

          <p className="text-gray-600 mb-3">{room.description}</p>

          {/* Ratings */}
          <div className="flex items-center mb-4">
            {RenderStars(room.averageRating?.toFixed(1))}
            <span className="ml-2 text-sm text-gray-500">
              ({room.averageRating?.toFixed(1) ?? 0}/5)
            </span>
          </div>

          {/* Features */}
          <div className="flex flex-wrap mb-5">
            {room.features.map((feature, i) => (
              // <li key={i}>{feature}</li>
              <span
                key={i}
                className="mr-2 mb-2 text-sm border border-amber-200 px-2 p-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Book Now Button */}
          <div className="flex justify-end">
            <button className="cursor-pointer inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
