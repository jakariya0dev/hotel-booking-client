import { useLoaderData } from "react-router";
import RoomItemCard from "../components/common/RoomItemCard";

export default function AllRooms() {
  const allRooms = useLoaderData();
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div>
          <select>
            <option value="1">1</option>
          </select>
        </div>
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Rooms in Our Hotel
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allRooms.map((room) => (
            <RoomItemCard key={room._id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}
