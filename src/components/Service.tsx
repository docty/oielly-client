import { Card, Grid, Flexbox, Icon, Cage, Heading, Paragraph } from "@synevix/react-widget";

const Service = () => (
    <Card className="mx-4 sm:mx-4 lg:mx-32 mt-12">
        <Grid lg={'3'} md={'2'} sm={'2'} gap={'6'} className={'py-8 px-5'}>
            <Flexbox>
                <Icon name="icon-truck" className={'mr-4'} style={{fontSize: '3rem'}} />
                <Cage className="">
                    <Heading type={'H4'} text={'Free Delivering & Return'} className="font-bold"/>
                    <Paragraph text={'Free delivering on orders'} />
                </Cage>
            </Flexbox>
            <Flexbox>
                <Icon name="icon-lifebuoy" className={'mr-4'} style={{fontSize: '3rem'}} />
                <Cage className="">
                    <Heading type={'H4'} text={'Customer Support 24/7'} className="font-bold"/>
                    <Paragraph text={'Instant access to perfect support'} />
                </Cage>
            </Flexbox>
            <Flexbox>
                <Icon name="icon-cash2" className={'mr-4'} style={{fontSize: '3rem'}} />
                <Cage className="">
                    <Heading type={'H4'} text={'100% Secure Payment'} className="font-bold"/>
                    <Paragraph text={'We ensure secure payment'} />
                </Cage>
            </Flexbox>
        </Grid>
    </Card>
);


export default Service;
