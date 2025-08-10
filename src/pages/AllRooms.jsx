import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import LoaderBar from "../components/common/LoaderBar";
import RoomItemCard from "../components/common/RoomItemCard";

export default function AllRooms() {
  const [loading, setLoading] = useState(false);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [sortType, setSortType] = useState("default");
  const [minPrice, setMinPrice] = useState(5);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${
          import.meta.env.VITE_BASE_URL
        }/rooms/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`
      )
      .then((res) => {
        let data = res.data.rooms;

        if (sortType === "price-asc") {
          data.sort((a, b) => a.price - b.price);
        } else if (sortType === "price-desc") {
          data.sort((a, b) => b.price - a.price);
        } else if (sortType === "rating-asc") {
          data.sort((a, b) => b.rating - a.rating);
        } else if (sortType === "rating-desc") {
          data.sort((a, b) => a.rating - b.rating);
        }

        setSortedRooms(data);
      })
      .catch((error) => console.error("Error fetching rooms:", error))
      .finally(() => setLoading(false));
  }, [minPrice, maxPrice, sortType]);

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value);
    if (value < maxPrice) setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > minPrice) setMaxPrice(value);
  };

  console.log(sortedRooms);

  if (loading) return <LoaderBar />;

  return (
    <>
      <Helmet>
        <title>All Rooms - SunsetBay Hotel</title>
        <meta
          name="description"
          content="Explore all available rooms at SunsetBay Hotel"
        />
      </Helmet>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-10 md:mb-16">
            {/* Sorting Options */}
            <div>
              <label htmlFor="rooms">Sort By:</label>
              <select
                className="ml-2 p-1 border rounded"
                id="rooms"
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-asc">Rating: High to Low</option>
                <option value="rating-desc">Rating: Low to High</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="w-full max-w-sm bg-white p-4 rounded-lg shadow-md">
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Filter Room by Price Range
              </label>

              <div className="flex justify-between text-sm text-gray-600 mb-1"></div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Min Price: <span>${minPrice}</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={minPrice}
                    onChange={handleMinChange}
                    className="w-full accent-green-600"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Max Price: <span>${maxPrice}</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={maxPrice}
                    onChange={handleMaxChange}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Rooms in{" "}
            <span className="underline underline-offset-8 decoration-amber-400 decoration-4">
              Our Hotel
            </span>
          </h2>

          {loading ? (
            <LoaderBar />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedRooms.length > 0 ? (
                sortedRooms.map((room) => (
                  <RoomItemCard key={room._id} room={room} />
                ))
              ) : (
                <div> No rooms found </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
