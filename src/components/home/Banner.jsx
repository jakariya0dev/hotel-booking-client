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
      title: "Welcome to Our SunsetBay Hotel",
      description:
        "Experience unmatched comfort, timeless elegance, and breathtaking views by the bay, creating unforgettable moments for every guest during their stay.",
      button: "Explore Our Rooms",
      bg: "bg-gradient-to-r from-indigo-600 to-blue-500",
      image: "https://i.ibb.co/RpQ726Db/banner3.jpg",
    },
    {
      title: "Relax in Our Luxurious Comfort",
      description:
        "Unwind in spacious, luxurious rooms designed for ultimate relaxation, offering modern amenities and serene views to refresh your spirit completely.",
      button: "Browse Our Rooms",
      bg: "bg-gradient-to-r from-purple-600 to-pink-500",
      image: "https://i.ibb.co/mrQb6sZ2/banner2.jpg",
    },
    {
      title: "We Awaits Your Perfect Escape",
      description:
        "Book your perfect escape at SunsetBay Hotel, where exceptional service, stunning surroundings, and cherished memories await to embrace your soul.",
      button: "Book a Room",
      bg: "bg-gradient-to-r from-green-600 to-teal-500",
      image: "https://i.ibb.co/3yjKLDpM/banner1.jpg",
    },
  ];

  return (
    <div className="bg-white w-full h-[400px] overflow-hidden shadow-lg">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              style={{ backgroundImage: `url(${slide.image})` }}
              className="bg-cover bg-center"
            >
              <div className="bg-[#00000095] text-white h-[400px] flex flex-col justify-center items-center px-10">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg mb-6 max-w-2xl text-center">
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
