import { useState } from 'react';
import { Cage, Grid, Image, Heading, Paragraph, TextField, Button, Flexbox } from '@docty68/widget';
import { Link } from 'react-router-dom';
import oielly from '@docty68/oielly-gateway';
import logo from '../assets/images/logo.png';
import payment from '../assets/images/payment.png';
import { Box } from './Box';


const Footer = () => {
    return (
        <Cage className={'px-4 lg:px-32 pt-3 bg-black text-white'}>
            <FooterTop />
            <FooterMiddle />
            <FooterBottom />
        </Cage>

    );
};

const FooterTop = () => {
    const [state, setState] = useState<string>('');

    const onNewLetterSubmit = (e: any) => {
        e.preventDefault();
        oielly.subscribe.create({
            data: {
                email: state
            },
            response: (success, error) => {
                if (error) { return}
                console.log(success);
            }
        })
    }

    return (

        <Grid md={'3'} className={'mb-5'}>
            <Link to={"/"}>
                <Image source={logo} alt="logo-footer" width="154" height="43" />
            </Link>
            <Cage >
                <Heading type={'H4'} text={'Subscribe to our Newsletter'} className={'font-bold text-2xl mb-3'} />
                <Paragraph text={'Get all the latest information, Sales and Offers'} />
            </Cage>
            <form onSubmit={(e) => onNewLetterSubmit(e)} className={'flex gap-3 my-2'} >
                <TextField type="email" placeholder="Email address here..." value={state} onValueChange={(e) => setState(e.target.value)} className={'text-black w-full'} />
                <Button type={'submit'} className="px-3 py-2 text-white uppercase font-bold" text={'Subscribe'} bgColor={'pink'} />
            </form>
        </Grid>


    )
}

const FooterMiddle = () => (

    <Grid md={'3'} className={'mb-5'}>

        <Cage>
            <Heading text={'Contact Info'} type={'H4'} className="uppercase text-gray-500 font-bold mb-2" />
            <Paragraph text={'Phone:'} className={'my-1 inline-block text-gray-400'} />
            <Paragraph text={'(233) 247-049-416'} className={'my-1 mx-3 inline-block '} />
            <br />
            <Paragraph text={'Email:'} className={'my-1 inline-block text-gray-400'} />
            <Paragraph text={'support@oielly.com'} className={'my-1 mx-3 inline-block '} />
            <br />
            <Paragraph text={'Address:'} className={'my-1 inline-block text-gray-400'} />
            <Paragraph text={'Kotei, KNUST'} className={'my-1 mx-3 inline-block '} />
            <br />
            <Paragraph text={'Working Days:'} className={'my-1 inline-block text-gray-400'} />
            <Paragraph text={'Monday - Sunday'} className={'my-1 mx-3 inline-block '} />

        </Cage>


        <Cage className="col-lg-4 col-md-6">
            <Heading text={'Information'} type={'H4'} className="uppercase text-gray-500 font-bold mb-2" />
            <Link to={'/about-us'} className={'my-1 block'}>About Us</Link>
            <Link to={'/faq'} className={'my-1 block'}>FAQ</Link>
            <Link to={'/terms'} className={'my-1 block'}>Terms &amp; Condition</Link>
        </Cage>

        <Cage className="col-lg-4 col-md-6">
            <Heading text={'Account'} type={'H4'} className="uppercase text-gray-500 font-bold mb-2" />
            <Link to={'/blog'} className={'my-1 block'}>Blog</Link>
            <Link to={'/track-order'} className={'my-1 block'}>Track Order</Link>

        </Cage>


    </Grid>


)

const FooterBottom = () => (
    <Grid md={'3'} className="footer-bottom pb-3">

        {/* TODO Change payment logo */}
        <Image source={payment} alt="payment" width="159" height="29" />
        <p className="copyright">Oielly  &copy; 2021. All Rights Reserved</p>

        {/* TODO Update the social media handlers */}
        <Flexbox className="footer-right gap-4">
            <Box className={'border-white hover:bg-white hover:text-black'}>
                <a href="#facebook" className="icon-facebook m-1"><i></i></a>
            </Box>
            <Box className={'border-white hover:bg-white hover:text-black'}>
                <a href="#facebook" className="icon-twitter m-1"><i></i></a>
            </Box>
            <Box className={'border-white hover:bg-white hover:text-black'}>
                <a href="#facebook" className="icon-linkedin m-1"><i></i></a>
            </Box>

             

        </Flexbox>
    </Grid>

)



export default Footer;
