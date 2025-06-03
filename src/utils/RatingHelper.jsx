import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

// Star rendering helper
const RenderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  }
  while (stars.length < 5) {
    stars.push(
      <FaRegStar key={`empty-${stars.length}`} className="text-yellow-400" />
    );
  }

  return <div className="flex items-center space-x-1">{stars}</div>;
};

export { RenderStars };
