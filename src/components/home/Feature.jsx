import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const features = [
  {
    name: "Resort",
    image: "https://i.ibb.co/601wHddg/08-resort.jpg",
  },
  {
    name: "Beach",
    image: "https://i.ibb.co/cKwvg4rB/07-beach.jpg",
  },
  {
    name: "Garden",
    image: "https://i.ibb.co/TB2byb01/05-garden.jpg",
  },
  {
    name: "Bar",
    image: "https://i.ibb.co/QvLJvt9r/04-bar.jpg",
  },
  {
    name: "Pool",
    image: "https://i.ibb.co/PzhZnjMd/03-pool.jpg",
  },
  {
    name: "Parking",
    image: "https://i.ibb.co/RGDw4bk2/06-parking.jpg",
  },
  {
    name: "Spa",
    image: "https://i.ibb.co/W487wJrw/02-spa.jpg",
  },
  {
    name: "Gym",
    image: "https://i.ibb.co/PdVGHT9/01-gym.jpg",
  },
];

const Feature = () => {
  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 5,
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
    <section className="bg-white">
      <div className="max-w-7xl mx-auto py-16">
        <h2 className=" text-gray-800 text-3xl font-bold text-center mb-5">
          What We Offer
        </h2>
        <Slider {...settings}>
          {features.map((feature) => (
            <div className="px-3 my-4">
              <div
                style={{
                  height: "200px",
                  backgroundImage: `url(${feature.image})`,
                }}
                className="bg-center bg-cover bg-no-repeat shadow-xl h-full"
              >
                <div className="bg-[rgba(0,0,0,0.65)] w-full h-full flex justify-center items-center">
                  <h3 className="text-2xl text-white font-semibold tracking-wider">
                    {feature.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Feature;
