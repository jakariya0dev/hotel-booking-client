import { Link } from "react-router";
import { RenderStars } from "./../utils/RatingHelper";

// Dummy data
const featuredRooms = [
  {
    id: 1,
    name: "Deluxe King Room",
    description:
      "Spacious room with king-size bed, city view, and premium amenities.",
    image: "https://i.ibb.co/RpQ726Db/banner3.jpg",
    features: ["Free WiFi", "Air Conditioning", "Breakfast Included"],
    rating: 4.5,
    price: 120,
  },
  {
    id: 2,
    name: "Ocean View Suite",
    description:
      "Enjoy breathtaking sea views with a private balcony and large living area.",
    image: "https://i.ibb.co/mrQb6sZ2/banner2.jpg",
    features: ["Ocean View", "Private Balcony", "Mini Bar"],
    rating: 5,
    price: 180,
  },
  {
    id: 3,
    name: "Executive Room",
    description:
      "Ideal for business travelers, comes with a work desk and coffee machine.",
    image: "https://i.ibb.co/3yjKLDpM/banner1.jpg",
    features: ["Desk", "Coffee Maker", "High-Speed WiFi"],
    rating: 4,
    price: 100,
  },
  {
    id: 4,
    name: "Honeymoon Suite",
    description:
      "Perfect for couples with luxurious ambiance and romantic decor.",
    image: "https://i.ibb.co/mrQb6sZ2/banner3.jpg",
    features: ["Jacuzzi", "King Bed", "Mood Lighting"],
    rating: 4.8,
    price: 200,
  },
  {
    id: 5,
    name: "Standard Double Room",
    description:
      "Affordable comfort with all essential amenities for a restful stay.",
    image: "https://i.ibb.co/mrQb6sZ2/banner2.jpg",
    features: ["TV", "Free WiFi", "Air Conditioning"],
    rating: 3.5,
    price: 75,
  },
  {
    id: 6,
    name: "Family Room",
    description:
      "Spacious enough for families, includes extra beds and kid-friendly perks.",
    image: "https://i.ibb.co/3yjKLDpM/banner1.jpg",
    features: ["Extra Beds", "Play Area", "Complimentary Snacks"],
    rating: 4.2,
    price: 140,
  },
];

export default function AllRooms() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div>
          <select>
            <option value="1">1</option>
          </select>
        </div>
        <h2 className="text-3xl font-bold text-center mb-10">
          Rooms in Our Hotel
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">{room.name}</h3>
                  <span className="text-blue-600 font-bold text-lg">
                    ${room.price}
                    <span className="text-sm font-normal text-gray-500">
                      {" "}
                      /night
                    </span>
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">{room.description}</p>

                {/* Ratings */}
                <div className="flex items-center mb-4">
                  {RenderStars(room.rating)}
                  <span className="ml-2 text-sm text-gray-500">
                    ({room.rating}/5)
                  </span>
                </div>

                {/* Features */}
                <ul className="text-sm text-gray-500 mb-4 list-disc list-inside">
                  {room.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>

                {/* Book Now Button */}
                <Link
                  to={`/rooms/${room.id}`}
                  className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
