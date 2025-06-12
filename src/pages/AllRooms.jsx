import { useState } from "react";
import { useLoaderData } from "react-router";
import RoomItemCard from "../components/common/RoomItemCard";

export default function AllRooms() {

  const allRooms = useLoaderData();
  const [sortedRooms, setSortedRooms] = useState(allRooms);

  function handleSortChange(event) {
    const sortValue = event.target.value;
    let sorted = [...allRooms];

    if (sortValue === "default") {
      setSortedRooms(allRooms);
    } else if (sortValue === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
      setSortedRooms(sorted);
    } else if (sortValue === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
      setSortedRooms(sorted);
    } else if (sortValue === "rating-asc") {
      sorted.sort((a, b) => b.rating - a.rating);
      setSortedRooms(sorted);
    } else if (sortValue === "rating-desc") {
      sorted.sort((a, b) => a.rating - b.rating);
      setSortedRooms(sorted);
    }
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div>
          <label htmlFor="rooms">Sort By:</label>
          <select
            className="ml-2 p-1 border rounded"
            id="rooms"
            onChange={handleSortChange}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price Low to High</option>
            <option value="price-desc">Price High to Low</option>
            <option value="rating-asc">Rating High to Low</option>
            <option value="rating-desc">Rating Low to High</option>
          </select>
        </div>
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Rooms in Our Hotel
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedRooms.map((room) => (
            <RoomItemCard key={room._id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}
