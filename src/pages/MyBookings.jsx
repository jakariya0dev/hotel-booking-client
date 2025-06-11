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
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/bookings/${user.email}`)
        .then((res) => {
          setBookingData(res.data);
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

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") {
      toast.error("Please fill in both fields.");
      return;
    }
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/review`, {
        userEmail: user.email,
        rating,
        comment,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Review submitted successfully!");
          setIsModalOpen(false);
          setRating(0);
          setComment("");
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
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table bg-base-300">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Room</th>
                <th>Booking Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.map((booking, index) => (
                <tr key={booking._id}>
                  <th>{index + 1}</th>
                  <td>{booking.roomName}</td>
                  <td>{booking.bookingDate}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Give Review
                    </button>

                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="btn btn-sm btn-primary"
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
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
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
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
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
