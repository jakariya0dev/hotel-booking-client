import { use, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LoaderBar from "../components/common/LoaderBar";
import { AuthContext } from "../providers/AuthProvider";

export default function MyBookings() {
  const [bookingData, setBookingData] = useState(null);
  const { user } = use(AuthContext);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/bookings/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookingData(data);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  }, [user.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_BASE_URL}/group/id/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            const updatedGroups = bookingData.filter(
              (group) => group._id !== id
            );
            setBookingData(updatedGroups);
            // console.log("Group deleted successfully!", data);
            Swal.fire({
              title: "Deleted!",
              text: "Your group has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting group:", error);
            toast.error("Failed to delete group.");
          });
      }
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
          Groups Dashboard
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
                    <Link to={`/group/${booking._id}/edit`}>
                      <button className="btn btn-sm btn-primary">
                        Give Review
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(booking._id)}
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
      </section>
    </>
  );
}
