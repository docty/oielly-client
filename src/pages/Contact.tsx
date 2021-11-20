import { Button, Cage, TextField, Grid, Heading, Paragraph, TextArea } from '@docty68/widget';
import { useState, useRef } from "react";
import Intro from '../components/Intro';
import oielly from '@docty68/oielly-gateway'
import { Box } from '../components/Box'; 

const Contact = () => {
    const [state, setState] = useState<IContact>({} as IContact);
    const [isLoading, setLoading] = useState<boolean>(false);
    const responseMessage = useRef<HTMLDivElement>(null);
    
    const onSubmitPost = (e: any) => {
        e.preventDefault();
        console.log(responseMessage)
        setLoading(true);
        oielly.contact.create({
            data: state,
            response: (success, error) => {
                if (error) {
                    console.log(error); 
                    setLoading(false);
                    return
                }
                responseMessage.current!.style.display = 'inline-block';
                setLoading(false);
                setTimeout(() => {
                    responseMessage.current!.style.display = 'none';
                }, 4000)
            }
        });
    }

  
    return (
        <Cage>
            <Intro name={'Contact us'} />
            <Grid md={'4'} gap={'5'} className={'mx-4 sm:mx-4 lg:mx-32 mt-5'}>

                <Cage className="p-6 bg-gray-100 col-span-4 md:col-span-1">
                    <Heading type={'H4'} text={'Headquaters'} className="mb-2 capitalize font-bold text-xl" />
                    <Paragraph text={'knust - kotei'} className={'uppercase'} />
                    <Paragraph text={'ghana - kumasi'} className={'uppercase mb-8'} />
                    <Heading type={'H4'} text={'Phone Number'} className="mb-2 capitalize font-bold text-xl" />
                    <Paragraph text={'(233)-247-049-416'} className={'uppercase'} />
                    <Paragraph text={'(233)-501-043-662'} className={'uppercase mb-8'} />
                    <Heading type={'H4'} text={'Support'} className="mb-2 capitalize font-bold text-xl" />
                    <Paragraph text={'support@oielly.com'} />
                    <Paragraph text={'help@oielly.com'} className={'mb-8'} />
                </Cage>


                <Cage className="col-span-2">
                    <form className="pl-lg-2" onSubmit={(e) => onSubmitPost(e)}>
                        <Heading type={'H4'} text={'Let’s Connect'} className="mb-2 capitalize font-bold text-xl" />
                        <Paragraph text={'Your email address will not be published. Required fields aremarked *'} className={'mb-8'} />
                        
                        

                        <TextField className="w-full mb-4" type="text" placeholder="Name *" value={state.name} onValueChange={(e) => setState({ ...state, name: e.target.value })} />

                        <TextField className="w-full mb-4" type="email" placeholder="Email *" value={state.email} onValueChange={(e) => setState({ ...state, email: e.target.value })} />
                        <TextArea className="w-full mb-4"  placeholder="Comment*" onValueChange={(e) => setState({ ...state, message: e.target.value })}></TextArea>

                        <Button className={[`p-2 text-white w-3/12 ${isLoading && 'cursor-not-allowed'}`].join(' ')} text={'Post Comment'} bgColor={'pink'} type={'submit'} isLoading={isLoading}/>
                    </form> 
                    <Box refer={responseMessage} className={'border rounded-sm w-full p-3 my-4 font-bold border-pink-500 border-l-4 hidden'}>Comment has been sent successfully</Box>
                      
                </Cage>
 


            </Grid>
            <div className="grey-section google-map" id="googlemaps" style={{ height: '386px' }} ></div>
            {/* TODO Google Map */}
        </Cage>

    )
}

export interface IContact {
    name: string;
    email: string;
    message: string;
}

 

export default Contact;