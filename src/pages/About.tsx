import { Cage, Grid, Heading, Icon, Image, List, ListItem, Paragraph, Span } from '@docty68/widget';
import Intro from '../components/Intro';
import aboutus from '../assets/images/subpages/customer.jpg';
import store1 from '../assets/images/subpages/store-1.jpg';
import store2 from '../assets/images/subpages/store-2.jpg';
import store3 from '../assets/images/subpages/store-3.jpg';
import store4 from '../assets/images/subpages/store-4.jpg';


const About = () => {
    return (
        <Cage>
            <Intro name={'About us'}  />
            <Cage className={'mx-4 sm:mx-4 lg:mx-32 mt-5'}>
                <Grid md={'2'} gap={'6'} >
                    <Image source={aboutus} alt={'About us'} />
                    <Cage className={' '}>
                        <Heading type={'H2'} text={'About Us'} className={'font-bold text-xl md:text-2xl md:mt-12'} />
                        <Paragraph text={`Oielly is an online shopping platform. It connects several material shop together in Ghana. 
                        We provide all our customers with the best and quality materials. Browse through a collection of different styles
                        of materials for different events.`} className={'text-gray-500 leading-8'} />
                        <Heading type={'H4'} text={'Key Features'} className={'font-bold text-base mt-5'} />
                        <List type={'ordered'}>
                            <ListItem className={'my-3'}>
                                <Span className={'bg-pink-500 rounded-full text-white p-1 mr-4'}>
                                    <Icon name={'icon-check'} className={''} />
                                </Span>
                                Browse through collection of designs
                            </ListItem>
                            <ListItem className={'my-3'}>
                                <Span className={'bg-pink-500 rounded-full text-white p-1 mr-4'}>
                                    <Icon name={'icon-check'} className={''} />
                                </Span>
                                Trusted payment system
                            </ListItem>
                            <ListItem className={'my-3'}> <Span className={'bg-pink-500 rounded-full text-white p-1 mr-4'}>
                                <Icon name={'icon-check'} className={''} />
                            </Span>
                                Quality &amp; Long-lasting materials
                            </ListItem>
                            <ListItem className={'my-3'}>
                                <Span className={'bg-pink-500 rounded-full text-white p-1 mr-4'}>
                                    <Icon name={'icon-check'} className={''} />
                                </Span>Guidance on the perfect design
                            </ListItem>
                            <ListItem className={'my-3'}>
                                <Span className={'bg-pink-500 rounded-full text-white p-1 mr-4'}>
                                    <Icon name={'icon-check'} className={''} />
                                </Span>Free delivery service
                            </ListItem>
                        </List>
                    </Cage>
                    <Cage className={' '}>
                        <Heading type={'H2'} text={'Our Store'} className={'font-bold text-xl md:text-2xl md:mt-12'} />
                        <Paragraph text={`We collaborate with different shops inorder to serve your need. 
                        Our platform is always open for new shop partners. Oielly operates with about one thousand shops across the 
                        country and still expanding.`} className={'text-gray-500 leading-8'} />
                    </Cage>
                    <StoreGallery />
                </Grid>
                <Brands />

            </Cage>

        </Cage>

    )
}

const StoreGallery = () => (
    <Grid gap={'3'} className={'grid-cols-3 grid-rows-2  '}>
        <Image source={store1} alt={'store'} />
        <Image source={store2} alt={'store'} />
        <Image source={store3} alt={'store'} />
        <Image source={store4} alt={'store'} />
    </Grid>
)

const Brands = () => (
    <Grid md={'4'} gap={'5'} className={'my-10 '}>
        <Heading type={'H3'} text={' Brands'} className={'col-span-4 font-bold text-xl md:text-2xl'} />
        <Image source={store1} alt={'store'} />
        <Image source={store2} alt={'store'} />
        <Image source={store3} alt={'store'} className={''} />
        <Image source={store4} alt={'store'} className={''} />
    </Grid>
)
export default About