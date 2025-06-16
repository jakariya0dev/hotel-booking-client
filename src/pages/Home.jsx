import Banner from "../components/home/Banner";
import CallToAction from "../components/home/CallToAction";
import Contact from "../components/home/Contact";
import FaqSection from "../components/home/FaqSection";
import Feature from "../components/home/Feature";
import FeaturedRooms from "../components/home/FeaturedRooms";
import PromoModal from "../components/home/PromoModal";
import Testimonial from "../components/home/Testimonial";
import { Helmet } from "react-helmet";


export default function Home() {
  return (
    <div>
      <Helmet>
        <title>SunsetBay Hotel</title>
        <meta
          name="description"
          content="Welcome to SunsetBay Hotel, your perfect getaway destination."
        />
      </Helmet>
      <Banner />
      <Feature />
      <FeaturedRooms />
      <Testimonial />
      <FaqSection />
      <Contact />
      <CallToAction />
      <PromoModal />
    </div>
  );
}
