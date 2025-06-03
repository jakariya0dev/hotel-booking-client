import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { RenderStars } from "../utils/RatingHelper";
import Modal from "./../components/common/Modal";

const dummyRoomData = [
  {
    id: 1,
    name: "Deluxe King Room",
    description:
      "Spacious room with king-size bed, city view, and premium amenities.",
    image: "https://i.ibb.co/3yjKLDpM/banner1.jpg",
    features: ["Free WiFi", "Air Conditioning", "Breakfast Included"],
    rating: 4.5,
    price: 120,
    reviews: [
      {
        user: "Alice",
        comment: "Loved the city view and comfort!",
        rating: 5,
      },
      {
        user: "John",
        comment: "Service was great. Worth the price.",
        rating: 4,
      },
    ],
  },
];

const RoomDetails = () => {
  const { id } = useParams();
  const room = dummyRoomData.find((room) => room.id === parseInt(id));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  if (!room) {
    return <div className="text-center text-xl py-20">Room not found!</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <img
          src={room.image}
          alt={room.name}
          className="w-full rounded-lg shadow"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
          <p className="text-gray-400 mb-3">{room.description}</p>

          <div className="text-yellow-400 flex items-center mb-2">
            {RenderStars(room.rating)}
            <span className="ml-2 text-gray-400">{room.rating}/5</span>
          </div>

          <ul className="list-disc list-inside text-gray-400 mb-4">
            {room.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <p className="text-lg font-semibold text-blue-600 mb-2">
            Price: ${room.price}{" "}
            <span className="text-sm text-gray-500">/night</span>
          </p>

          <label className="block mb-4">
            <span className="text-sm text-gray-400">Select Date:</span>
            <input
              type="date"
              className="border px-3 py-2 rounded mt-1 w-full"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </label>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        {room.reviews.length === 0 ? (
          <p className="text-gray-500 italic">
            No reviews yet. Be the first to leave one!
          </p>
        ) : (
          <div className="space-y-4">
            {room.reviews.map((review, i) => (
              <div key={i} className="bg-base-100 shadow p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="font-semibold flex items-center gap-2">
                    <FaUserCircle size={20} />
                    {review.user}
                  </span>
                  <div className="text-yellow-400 flex">
                    {RenderStars(review.rating)}
                    <span className="ml-2 text-gray-400">{room.rating}/5</span>
                  </div>
                </div>
                <p className="text-gray-400 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Booking Summary</h2>
            <p>
              <strong>Room:</strong> {room.name}
            </p>
            <p>
              <strong>Price:</strong> ${room.price}/night
            </p>
            <p>
              <strong>Date:</strong> {selectedDate || "Not selected"}
            </p>
            <p className="text-sm text-gray-500 mt-2">{room.description}</p>

            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => {
                // Handle booking logic here
                alert("Booking Confirmed!");
                setIsModalOpen(false);
              }}
            >
              Confirm Booking
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RoomDetails;
