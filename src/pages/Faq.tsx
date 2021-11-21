import { Cage, Grid, Heading, Paragraph } from "@synevix/react-widget";
import Intro from "../components/Intro";

const Faq = () => (
    <Cage>
        <Intro name={'Frequently Asked Question'} />
        <Grid md={'2'} gap={'5'} className={'mx-4 sm:mx-4 lg:mx-32 mt-5 mb-6'}>
            <Cage>
                <Heading type={'H3'} text={'How long does it take to my order'} className={'font-bold text-xl my-6'}/>
                <Paragraph text={'Order takes an average of 3-5 working days to be ready for delivering'} className={'text-gray-500'}/>
            </Cage>
        </Grid>
    </Cage>
)

export default Faq;