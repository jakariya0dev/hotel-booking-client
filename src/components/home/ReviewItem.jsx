import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

export default function ReviewItem({ review }) {
  return (
    <div className="px-3 my-4 min-h-80">
      <div className="p-6 rounded-xl shadow-xl h-full flex flex-col items-center justify-center text-center">
        <img
          src={review.photoUrl}
          alt={review.name}
          className="w-20 h-20 rounded-full object-cover mb-2"
        />
        <h3 className="text-xl font-semibold">{review.userName}</h3>

        <div className="flex justify-center text-yellow-400 mt-2 mb-5">
          {Array(review.rating)
            .fill()
            .map((_, i) => (
              <FaStar key={i} />
            ))}
        </div>

        <BiSolidQuoteAltLeft className="place-self-start -mb-4" size={20} />
        <p className="px-8 text-justify">{review.comment}</p>
        <BiSolidQuoteAltRight className="place-self-end -mt-4" size={20} />
      </div>
    </div>
  );
}
