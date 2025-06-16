import { useState } from "react";

const PromoModal = () => {
  const [showModal, setShowModal] = useState(true);

  //   useEffect(() => {
  //     const hasVisited = localStorage.getItem("hasVisitedPromoModal");
  //     if (!hasVisited) {
  //       setShowModal(true);
  //       localStorage.setItem("hasVisitedPromoModal", "true");
  //     }
  //   }, []);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-0 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <img
          src="https://i.ibb.co/RpQ726Db/banner3.jpg"
          alt="SunsetBay"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />

        <h2 className="text-2xl font-semibold mb-4 text-center text-amber-500">
          Welcome to Sunset Hotel
        </h2>
        <p className="text-5xl capitalize font-semibold text-center mb-4">
          <span className="text-indigo-600">30%</span> off on your{" "}
          <span>First stay</span>
        </p>
        <p className="text-gray-700 text-center mb-4">
          Book now and enjoy exclusive discounts on your first stay! Discover
          luxury by the bay.
        </p>
      </div>
    </div>
  );
};

export default PromoModal;
