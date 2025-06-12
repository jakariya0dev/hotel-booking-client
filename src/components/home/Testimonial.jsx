import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";

const reviews = [
  {
    name: "Emma Watson",
    role: "Book Club Member",
    comment:
      "HobbyHub helped me find the perfect book club in my area. I've met amazing people.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
  },
  {
    name: "Liam Smith",
    role: "Hiking Enthusiast",
    comment:
      "This platform connected me with a local hiking group that meets every weekend. Love it!",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 4,
  },
  {
    name: "Sophia Lee",
    role: "Painting Instructor",
    comment:
      "I started a painting circle through HobbyHub and now host weekly workshops. Super easy to use.",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 5,
  },
  {
    name: "Noah Johnson",
    role: "Guitar Player",
    comment: "Met a few friends who love jamming on weekends. HobbyHub rocks!",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 4,
  },
  {
    name: "Ava Williams",
    role: "Cooking Hobbyist",
    comment:
      "Joined a cooking club near me. Learned new recipes and made new friends!",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    rating: 5,
  },
];

const Testimonial = () => {
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/reviews`)
      .then((response) => {
        setReviewsData(response.data.reviews);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setReviewsData(reviews); // Fallback to static data
      });
  }, []);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 my-12">
      <h2 className="text-3xl font-bold text-center mb-5">
        What Our Customer Say
      </h2>
      <Slider {...settings}>
        {reviewsData.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;
