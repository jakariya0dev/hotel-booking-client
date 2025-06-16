import axios from "axios";
import { format } from "date-fns";
import { use, useState } from "react";
import { Helmet } from "react-helmet";
import { FaUserCircle } from "react-icons/fa";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../providers/AuthProvider";
import { RenderStars } from "../utils/RatingHelper";
import Modal from "./../components/common/Modal";

const RoomDetails = () => {
  const roomDetails = useLoaderData();
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(roomDetails);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const handleOpenBookingModal = () => {
    if (!user) {
      toast.error("Please login to book a room.");
      navigate("/login", { state: location.pathname });
    } else {
      setIsModalOpen(true);
    }
  };

  const handleBookingConfirm = () => {
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
      return;
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken}`,
    };
    const bookingData = {
      userEmail: user.email,
      roomId: roomDetails._id,
      bookingDate: selectedDate,
      reviewed: false,
    };

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/book-room`, bookingData, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsModalOpen(false);
        setSelectedDate("");
      });
  };

  if (!roomDetails) {
    return <div className="text-center text-xl py-20">Room not found!</div>;
  }

  return (
    <>
      <Helmet>
        <title> SunsetBay - {roomDetails.name}</title>
        <meta
          name="description"
          content={`Details of ${roomDetails.name} in SunsetBay`}
        />
      </Helmet>
      <section>
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div>
              <img
                src={roomDetails.image}
                alt={roomDetails.name}
                className="w-full rounded-lg shadow"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2">{roomDetails.name}</h1>
              <p className="text-gray-400 mb-3">{roomDetails.description}</p>

              <div className="text-yellow-400 flex items-center mb-2">
                {RenderStars(roomDetails.rating)}
                <span className="ml-2 text-gray-400">
                  {roomDetails.rating}/5
                </span>
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

              {roomDetails.bookings.length > 0 && (
                <div className="my-4">
                  <div className="text-gray-500 mb-2 font-semibold">
                    This Room Unavailable on:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {roomDetails.bookings.map((booking, index) => (
                      <span
                        key={index}
                        className="text-blue-500 font-semibold border border-gray-200 px-4 py-1 rounded-md"
                      >
                        {format(new Date(booking.bookingDate), "dd MMM, yyyy")}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={handleOpenBookingModal}
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-10 ">
            <h2 className="text-2xl font-semibold mb-4">
              Customer Reviews ({roomDetails.reviews.length})
            </h2>
            {roomDetails.reviews.length === 0 ? (
              <p className="text-gray-500 italic">
                No reviews yet. Be the first to leave one!
              </p>
            ) : (
              <div className="space-y-4">
                {roomDetails.reviews.map((review, i) => (
                  <div
                    key={i}
                    className="shadow-md p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold flex items-center gap-2">
                        <FaUserCircle size={20} />
                        {review.userName || "Anonymous"}
                      </span>
                      <div className="text-yellow-400 flex">
                        {RenderStars(review.rating)}
                        <span className="ml-2 text-gray-400">
                          {review.rating}/5
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
                <h2 className="text-2xl font-bold mb-2 text-center">
                  Booking Summary
                </h2>
                <hr className="mb-4 border-gray-200" />
                <p className="mb-1 text-gray-500">
                  <strong>Room:</strong> {roomDetails.name}
                </p>
                <p className="mb-1 text-gray-500">
                  <strong>Price:</strong> ${roomDetails.price}/night
                </p>
                <p className="mb-1 text-gray-500">
                  <strong>Date:</strong> {selectedDate || "Not selected"}
                </p>

                <label className="block my-4">
                  <span className="text-sm text-gray-500">Select Date:</span>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="border border-gray-400 px-3 py-2 rounded mt-1 w-full bg-gray-300"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </label>
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
      </section>
    </>
  );
};

export default RoomDetails;
