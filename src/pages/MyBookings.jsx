import axios from "axios";
import { use, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LoaderBar from "../components/common/LoaderBar";
import Modal from "../components/common/Modal";
import { AuthContext } from "../providers/AuthProvider";

export default function MyBookings() {
  const { user } = use(AuthContext);
  const [bookingData, setBookingData] = useState(null);
  const [isMoadalOpen, setIsModalOpen] = useState(false);
  const [review, setReview] = useState(null);
  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState("");

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/bookings/${user.email}`)
        .then((res) => {
          setBookingData(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        });
    }
  }, [user?.email]);

  const handleCancelBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel Booking!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_BASE_URL}/bookings/${id}`, {
            data: { userEmail: user.email },
          })
          .then((res) => res.json())
          .then((data) => {
            const updatedBookings = bookingData.filter(
              (group) => group._id !== id
            );
            setBookingData(updatedBookings);
            console.log(data);
            Swal.fire({
              title: "Booking Cancelled!",
              text: "Your booking has been cancelled.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error cancelling booking:", error);
            toast.error("Failed to cancel booking.");
          });
      }
    });
  };

  const handleOpenReviewModal = (roomId, bookingId) => {
    setIsModalOpen(true);
    setReview({
      roomId,
      bookingId,
      userName: user.displayName,
      userEmail: user.email,
      date: new Date(),
    });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (review.rating === 0 || review.comment.trim() === "") {
      toast.error("Please fill in both fields.");
      return;
    }
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/review`, review)
      .then((res) => {
        if (res.data.success) {
          toast.success("Review submitted successfully!");
          setIsModalOpen(false);

          const updatedBookings = bookingData.map((booking) => {
            if (booking._id === review.bookingId) {
              return { ...booking, reviewed: true };
            }
            return booking;
          });
          setBookingData(updatedBookings);
          setReview(null);
        } else {
          toast.error("Failed to submit review.");
        }
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        toast.error("Failed to submit review.");
      });
  };

  if (bookingData === null) return <LoaderBar />;

  if (bookingData.length === 0) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center my-5">
          No Room Booked Yet!
        </h1>
        <Link to="/rooms">
          <button className="btn btn-primary">Book a Room</button>
        </Link>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>HobbyHub | Groups Dashboard</title>
        <meta name="description" content="Group Dashboard" />
      </Helmet>
      <section className="max-w-7xl mx-auto pt-10 min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center my-5">
          Booking Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-5">
          Here you can manage your bookings and leave reviews for the rooms you've
          booked.
        </p>
        <div className="overflow-x-auto rounded-box border border-gray-200">
          <table className="table">
            {/* head */}
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Room</th>
                <th>Price</th>
                <th>Booking Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.map((booking, index) => (
                <tr key={booking._id} className="border-b border-gray-200">
                  <th>{index + 1}</th>
                  <td>
                    <img
                      src={booking.roomDetails.image}
                      className="w-20"
                      alt={booking.roomDetails.name}
                    />
                  </td>
                  <td>{booking.roomDetails.name}</td>
                  <td>${booking.roomDetails.price}</td>
                  <td>{booking.bookingDate}</td>
                  <td className="flex gap-2">
                    {booking.reviewed ? (
                      <button disabled className="border border-gray-300 bg-gray-100 text-gray-500 px-3 py-1 rounded">
                        Review Submitted
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleOpenReviewModal(
                            booking.roomDetails._id,
                            booking._id
                          )
                        }
                        className="btn btn-sm btn-primary text-white"
                      >
                        Leave a Review
                      </button>
                    )}

                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      Cancel Booking
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isMoadalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <form
              onSubmit={handleSubmitReview}
              className="max-w-md mx-auto p-6 space-y-4"
            >
              <h2 className="text-xl font-semibold">Leave a Review</h2>

              {/* Rating Field */}
              <div>
                <label className="block mb-1">Rating</label>
                <select
                  value={review.rating || 0}
                  required
                  onChange={(e) =>
                    setReview({ ...review, rating: parseInt(e.target.value) })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>Select a rating</option>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>
                      {star} Star{star > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Comment Field */}
              <div>
                <label className="block mb-1">Comment</label>
                <textarea
                  value={review.comment || ""}
                  onChange={(e) =>
                    setReview({ ...review, comment: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Write your thoughts..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Submit Review
              </button>
            </form>
          </Modal>
        )}
      </section>
    </>
  );
}
