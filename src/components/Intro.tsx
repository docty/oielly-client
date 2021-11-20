import { Flexbox, Heading, Breadcrumb } from "@docty68/widget";
import { IIntro } from "../interface/type";

const Intro = (props: IIntro) => (

    <Flexbox justifyContent={'between'} className={'px-4 md:px-32 py-12 bg-pink-300'}>
        <Heading type={'H3'} text={props.name} className={'text-2xl font-bold md:text-3xl uppercase text-white'}/>
        <Breadcrumb
            items={[
                {text: 'Home', url: '/'},
                {text: props.name, url: '/material/gtp'},
            ]}
            properties={{
                activeColor: '#fff',
                inActiveColor: '#000',
                hoverColor: '',
            }}
        />
        
    </Flexbox>
)

export default Intro;