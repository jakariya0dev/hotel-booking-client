import { Link } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

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
      title: "Welcome to SunsetBay Hotel",
      description:
        "Experience comfort, elegance, and breathtaking views by the bay.",
      button: "Explore Our Rooms",
      bg: "bg-gradient-to-r from-indigo-600 to-blue-500",
      image: "https://i.ibb.co/RpQ726Db/banner3.jpg",
    },
    {
      title: "Relax in Style",
      description:
        "Unwind in our luxurious rooms designed for your perfect stay.",
      button: "Browse Our Rooms",
      bg: "bg-gradient-to-r from-purple-600 to-pink-500",
      image: "https://i.ibb.co/mrQb6sZ2/banner2.jpg",
    },
    {
      title: "Your Escape Awaits",
      description:
        "Book your stay at SunsetBay and make every moment memorable.",
      button: "Book a Room",
      bg: "bg-gradient-to-r from-green-600 to-teal-500",
      image: "https://i.ibb.co/3yjKLDpM/banner1.jpg",
    },
  ];

  return (
    <div className="bg-white w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              style={{ backgroundImage: `url(${slide.image})` }}
              className="bg-cover bg-center"
            >
              <div className="bg-[#00000095] text-white h-[400px] flex flex-col justify-center items-center px-10">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg mb-6 max-w-lg text-center">
                  {slide.description}
                </p>
                <Link to="/rooms" className="btn btn-primary">
                  {slide.button}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
