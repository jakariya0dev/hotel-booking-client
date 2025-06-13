import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ReviewItem from "./ReviewItem";

const Testimonial = () => {
  const [reviewsData, setReviewsData] = useState([]);

  const uniqueReviews = [
    ...new Map(
      reviewsData.map((review) => [review.userEmail, review])
    ).values(),
  ];

  // console.log(uniqueReviews);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/reviews`)
      .then((response) => {
        setReviewsData(response.data.reviews);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
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
    <div className="max-w-7xl mx-auto px-4 mb-16">
      <h2 className="text-3xl font-bold text-center mb-5">
        What Our Customer Say
      </h2>
      <Slider {...settings}>
        {uniqueReviews.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;
