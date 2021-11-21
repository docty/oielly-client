import { Cage, Grid, Heading, Image } from '@synevix/react-widget';
import { Link } from 'react-router-dom';
import cart1 from '../assets/images/categories/item_1.png';
import cart2 from '../assets/images/categories/item2.png';
import cart3 from '../assets/images/categories/item_1.png';
import cart4 from '../assets/images/categories/item2.png';
import * as css from '../utility/styling';

const Category = () => {
    return ( 
        <Cage className="mx-4 sm:mx-4 lg:mx-32 pt-10 mt-7">
            <Heading type={'H2'} text={'Categories'} className={'uppercase text-center font-bold text-2xl mb-4'} />
            <Grid  lg={'4'} sm={'1'} md={'2'} gap={'8'}>
                <Link to={"/material/gtp"}>
                    <Image source={cart1} alt={'category'} width={'100%'} className={css.categoryBox} />
                    <Heading  type={'H4'} text={'GTP'} className={'hover:bg-pink-500'}/>
                </Link>
                <Link to={"/material/woodin"}>
                    <Image source={cart2} alt={'category'} width={'100%'} className={css.categoryBox} />
                    <Heading  type={'H4'} text={'Woodin'} className={'hover:bg-pink-500'}/>
                </Link>
                <Link to={"/material/holland"}>
                    <Image source={cart3} alt={'category'} width={'100%'} className={css.categoryBox} />
                    <Heading  type={'H4'} text={'Holland'} className={'hover:bg-pink-500'}/>
                </Link>
                <Link to={"/material/atl"}>
                    <Image source={cart4} alt={'category'} width={'100%'} className={css.categoryBox} />
                    <Heading  type={'H4'} text={'ATL'} className={'hover:bg-pink-500'}/>
                </Link>
            </Grid>
        </Cage>

    );
};

export default Category;
