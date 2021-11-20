import img from '../assets/images/banner.jpg';
import img2 from '../assets/images/buttons/banner.jpg'
import { Cage, Carousel, Paragraph } from '@docty68/widget'
import { Link } from "react-router-dom";

const Slide = () => {

    return (

        <Cage className="w-full relative">
            <Carousel
                image={[img, img2]}
            >
                <Cage className={'absolute text-white top-20 left-12 text-2xl md:text-4xl'}>
                    <Paragraph className={'font-bold my-7'} text={'MATERIALS COLLECTION'} />
                    <Link to={'/material/gtp'} className={'bg-pink-600 p-3 px-7 text-sm rounded uppercase font-bold'}>Shop Now
                    </Link>
                </Cage>
                <Cage className={'absolute text-white top-20 left-12 text-2xl md:text-4xl'}>
                    <Paragraph className={'font-bold my-7'} text={'AMAZING OUTFIT'} />
                    <Link to={'/material/gtp'} className={'bg-pink-600 p-3 px-7 text-sm rounded uppercase font-bold'}>Shop Now
                    </Link>
                </Cage>
            </Carousel>


        </Cage>


    );
};

export default Slide;
