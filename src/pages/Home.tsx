import { Cage } from "@docty68/widget";
import Slide from "../components/Carousel";
import Service from "../components/Service";
import Category from '../components/Category';
import Feature from '../components/Feature'; 

const Home = () => (
  <Cage className="mb-6">
    <Slide />
    <Service />
    <Category />
    <Feature/> 
  </Cage>

)


export default Home;
