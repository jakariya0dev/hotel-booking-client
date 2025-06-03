import Banner from "../components/home/Banner";
import CallToAction from "../components/home/CallToAction";
import Contact from "../components/home/Contact";
import Feature from "../components/home/Feature";
import FeaturedRooms from "../components/home/FeaturedRooms";

export default function Home() {
  return (
    <div>
      <Banner />
      <Feature />
      <FeaturedRooms />
      <Contact />
      <CallToAction />
    </div>
  );
}
