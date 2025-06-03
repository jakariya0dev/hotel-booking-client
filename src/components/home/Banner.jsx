import { Link } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getImgUrl } from "./../../utils/utils.js";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const slides = [
    {
      title: "Welcome to Our Community",
      description: "Find, join, and grow your favorite hobby groups near you.",
      button: "Explore Our Rooms",
      bg: "bg-gradient-to-r from-indigo-600 to-blue-500",
      image: "banner/banner1.jpg",
    },
    {
      title: "Discover New Interests",
      description: "Join a community that shares your passion and enthusiasm.",
      button: "Browse Our Rooms",
      bg: "bg-gradient-to-r from-purple-600 to-pink-500",
      image: "banner/banner2.jpg",
    },
    {
      title: "Connect & Share",
      description: "Meet like-minded people and share your experiences.",
      button: "Boo a Rooms",
      bg: "bg-gradient-to-r from-green-600 to-teal-500",
      image: "banner/banner3.jpg",
    },
  ];

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              className={`${slide.bg} text-white h-[400px] flex flex-col justify-center items-start px-10`}
            >
              <p>{getImgUrl(slide.image)}</p>
              <img src={"./../assets/image/" + slide.image} alt={slide.image} />
              <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg mb-6 max-w-md">{slide.description}</p>
              <Link to="/rooms" className="btn btn-accent text-white">
                {slide.button}
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
