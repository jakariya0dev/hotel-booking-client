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
  const [bookingsData, setbookingsData] = useState(null);
  const [isReviewMoadalOpen, setIsReviewModalOpen] = useState(false);
  const [isUpdateBookingMoadalOpen, setIsUpdateBookingModalOpen] =
    useState(false);
  const [review, setReview] = useState(null);
  const [selectedBookingData, setSelectedBookingData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/bookings/${user.email}`)
        .then((res) => {
          setbookingsData(res.data);
          // console.log(res.data);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        });
    }
  }, [user?.email]);

  const handleUpdateBooking = (id) => {
    const booking = bookingsData.find((booking) => booking._id === id);
    if (booking) {
      setSelectedBookingData({
        bookingDate: booking.bookingDate,
        _id: booking._id,
      });
      setIsUpdateBookingModalOpen(true);
    }
  };

  const handleSubmitUpdateBooking = (e) => {
    e.preventDefault();
    setIsUpdateBookingModalOpen(false);

    // Update booking date
    axios
      .patch(
        `${import.meta.env.VITE_BASE_URL}/bookings/${selectedBookingData._id}`,
        selectedBookingData._id
      )
      .then((res) => {
        if (res.data.success) {
          toast.success("Booking date updated successfully!");

          console.log(res.data);

          const updatedBookings = bookingsData.map((booking) => {
            if (booking._id === selectedBookingData._id) {
              return {
                ...booking,
                bookingDate: selectedBookingData.bookingDate,
              };
            }
            return booking;
          });
          setbookingsData(updatedBookings);
        } else {
          toast.error("Failed to update booking date.");
        }
      })
      .catch((error) => {
        console.error("Error updating booking:", error);
        toast.error("Failed to update booking.");
      });
  };

  const handleCancelBooking = (id) => {
    // Cancel booking only one day before the booking date
    const booking = bookingsData.find((booking) => booking._id === id);
    const bookingDate = new Date(booking.bookingDate);
    const today = new Date();
    const oneDayBefore = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    if (bookingDate < oneDayBefore) {
      toast.error(
        "You can cancel booking only one day before the booking date."
      );
      return;
    }

    // Booking cancel confirmation dialog
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
        // user select yes to cancel booking
        axios
          .delete(`${import.meta.env.VITE_BASE_URL}/bookings/${id}`, {
            data: { userEmail: user.email },
          })
          .then((res) => res.json())
          .then((data) => {
            const updatedBookings = bookingsData.filter(
              (group) => group._id !== id
            );
            setbookingsData(updatedBookings);
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
    setIsReviewModalOpen(true);
    setReview({
      roomId,
      bookingId,
      userName: user.displayName,
      userEmail: user.email,
      photoUrl: user.photoURL,
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
          setIsReviewModalOpen(false);

          const updatedBookings = bookingsData.map((booking) => {
            if (booking._id === review.bookingId) {
              return { ...booking, reviewed: true };
            }
            return booking;
          });
          setbookingsData(updatedBookings);
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

  if (bookingsData === null) return <LoaderBar />;

  if (bookingsData.length === 0) {
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
        <h1 className="text-3xl font-bold text-center mb-2">
          Booking Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Manage your bookings and leave reviews for the rooms you've booked.
        </p>
        <div className="overflow-x-auto rounded-box border border-gray-200">
          <table className="table">
            {/* Table header */}
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Room</th>
                <th>Price</th>
                <th>Booking Date</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookingsData.map((booking, index) => (
                <tr key={booking._id} className="border-b border-gray-200">
                  <th>{index + 1}</th>
                  <td>
                    <img
                      src={booking.roomDetails[0].image}
                      className="w-20"
                      alt={booking.roomDetails[0].name}
                    />
                  </td>
                  <td>{booking.roomDetails[0].name}</td>
                  <td>${booking.roomDetails[0].price}</td>
                  <td>{booking.bookingDate}</td>
                  <td className="flex items-center justify-center gap-2">
                    {booking.reviewed ? (
                      <button
                        disabled
                        className="bg-blue-100 border border-blue-200 text-gray-600 py-1 px-2 rounded"
                      >
                        Review Submitted
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleOpenReviewModal(
                            booking.roomDetails[0]._id,
                            booking._id
                          )
                        }
                        className="btn btn-sm bg-blue-500 border-0 text-white"
                      >
                        Leave a Review
                      </button>
                    )}

                    <button
                      onClick={() => handleUpdateBooking(booking._id)}
                      className="btn btn-sm border-0 bg-green-600 text-white"
                    >
                      Update Booking
                    </button>
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="btn btn-sm border-0 bg-red-500 text-white"
                    >
                      Cancel Booking
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Review Form */}
        {isReviewMoadalOpen && (
          <Modal onClose={() => setIsReviewModalOpen(false)}>
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

        {/* Modal for Update Booking Form */}
        {isUpdateBookingMoadalOpen && (
          <Modal onClose={() => setIsUpdateBookingModalOpen(false)}>
            <form
              onSubmit={handleSubmitUpdateBooking}
              className="max-w-md mx-auto p-6 space-y-4"
            >
              <h2 className="text-xl font-semibold">Update Booking Date</h2>

              {/* Date Field */}
              <div>
                <label className="block mb-1">Date</label>
                <input
                  type="date"
                  value={selectedBookingData?.bookingDate || ""}
                  onChange={(e) =>
                    setSelectedBookingData({
                      ...selectedBookingData,
                      bookingDate: e.target.value,
                    })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                disabled={!selectedBookingData?.bookingDate}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Update Booking
              </button>
            </form>
          </Modal>
        )}
      </section>
    </>
  );
}
