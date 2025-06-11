import axios from "axios";
import { format } from "date-fns";
import { use, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../providers/AuthProvider";
import { RenderStars } from "../utils/RatingHelper";
import Modal from "./../components/common/Modal";

const RoomDetails = () => {
  const roomDetails = useLoaderData();
  const { user } = use(AuthContext);

  console.log(roomDetails);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const handleBookNow = () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    if (
      roomDetails.bookings.some(
        (booking) => booking.bookingDate === selectedDate
      )
    ) {
      toast.error("This room is not available at the selected date.");
      setIsModalOpen(false);
      return;
    }

    setIsModalOpen(true);
  };

  const handleBookingConfirm = () => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/book-room`, {
        userEmail: user.email,
        roomId: roomDetails._id,
        bookingDate: selectedDate,
        reviewed: false,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);

        toast.error("Something went wrong!");
      });
    setIsModalOpen(false);
  };

  if (!roomDetails) {
    return <div className="text-center text-xl py-20">Room not found!</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div>
          <img
            src={roomDetails.image}
            alt={roomDetails.name}
            className="w-full rounded-lg shadow"
          />
          <div className="mt-4 flex items-center gap-2">
            <span className="text-gray-500">This Room Not Available at:</span>
            {roomDetails.bookings.map((booking, index) => (
              <span
                key={index}
                className="text-blue-500 font-semibold border px-4 py-1 rounded-full"
              >
                {format(new Date(booking.bookingDate), "dd MMM, yy")}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{roomDetails.name}</h1>
          <p className="text-gray-400 mb-3">{roomDetails.description}</p>

          <div className="text-yellow-400 flex items-center mb-2">
            {RenderStars(roomDetails.rating)}
            <span className="ml-2 text-gray-400">{roomDetails.rating}/5</span>
          </div>

          <ul className="list-disc list-inside text-gray-400 mb-4">
            {roomDetails.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <p className="text-lg font-semibold text-blue-600 mb-2">
            Price: ${roomDetails.price}{" "}
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
            onClick={handleBookNow}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        {roomDetails.reviews.length === 0 ? (
          <p className="text-gray-500 italic">
            No reviews yet. Be the first to leave one!
          </p>
        ) : (
          <div className="space-y-4">
            {roomDetails.reviews.map((review, i) => (
              <div key={i} className="bg-base-100 shadow p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="font-semibold flex items-center gap-2">
                    <FaUserCircle size={20} />
                    {review.userName || "Anonymous"}
                  </span>
                  <div className="text-yellow-400 flex">
                    {RenderStars(review.rating)}
                    <span className="ml-2 text-gray-400">
                      {roomDetails.rating}/5
                    </span>
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
              <strong>Room:</strong> {roomDetails.name}
            </p>
            <p>
              <strong>Price:</strong> ${roomDetails.price}/night
            </p>
            <p>
              <strong>Date:</strong> {selectedDate || "Not selected"}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {roomDetails.description}
            </p>

            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleBookingConfirm}
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
