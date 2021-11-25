//import oielly from '@synevix/oielly-gateway';
import { Grid, Cage, Heading, Flexbox, Image, Paragraph, Button, Card } from '@synevix/react-widget';
import { Children, useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom"
import cart1 from '../assets/images/categories/item_1.png';
import { IProduct } from '../interface/type';
import { useAuth } from '../utility/userContext';
import { Toast } from './Toast';
 
const Feature = () => {
     

    return (
        <>
            <Item title={'Popular'} status={'popular'}/>
            <Item title={'New Arrival'} status={'new_arrival'}/>
        </>
    );
};

const Item = (props: IFeature) => {
    const toastRef = useRef<HTMLDivElement>(null);
    const [state, dispatch] = useAuth();
    const [materials, ] = useState<IProduct[]>([]);

    useEffect(() => {
        // oielly.selection.list({
        
        //     //status: props.status,
        //    response: (success: any, error: any) => {
        //         if (error) { console.error(error); return }
        //         setMaterials(success)
        //     }
        // })

    }, [props.status]);

    const addToCart = (data: IProduct) => {
        toastRef.current!.style.left = '4px';
        const { id, materialName, price, imageUrl, productId } = data;
        dispatch([...state, { id, materialName, productId, price, quantity: 1, image: imageUrl[0] }]);
        setTimeout(() => {
            toastRef.current!.style.left = '-500px';
        }, 3000)
    }

    return (
        <Cage className="mx-4 sm:mx-4 lg:mx-32">
            <Heading
                type={'H2'}
                text={props.title}
                className="font-bold uppercase mb-4 text-xl"
            />
            <Grid lg={'3'} md={'3'} sm={'1'} >
                {Children.toArray(materials.map((item: IProduct) => (
                    <Product  {...item} addToCart={addToCart} />
                )))}
            </Grid>
            <Toast
                className={'mt-3 opacity-90 -left-96'}
                refs={toastRef}
                title={'Cart'}
                message={'Material has been added to cart'}
            />
        </Cage>
    );
}
const Product = (item: IAction) => {
    return (
        <Card className="">
            <Cage className="relative">
                <Link to={`/view/${item.referenceId}`}>
                    {/* TODO Change Image to item.imageUrl[0] */}
                    <Image source={cart1} alt="product" />
                </Link>
            </Cage>
            <Cage className="mt-2">
                <Paragraph text={item.materialName} className="capitalize text-xs my-1 text-gray-700" />
                <Paragraph text={item.category} className={'uppercase text-sm my-1 text-gray-800'} />
                <Paragraph text={'GHC ' + item.price} className={'font-bold text-red-700 text-base my-1'} />
            </Cage>
            <Flexbox>
                <Button icon={'icon-cart5'} text={'Add to cart'} className=" font-bold text-xs hover:bg-black hover:text-white uppercase bg-white  py-3  border px-4" onClick={() => item.addToCart(item)} />
            </Flexbox>
        </Card>
    )
}

interface IAction extends IProduct {
    addToCart: (item: any) => void;
}

interface IFeature {
    title: string;
    status: string;
}

export default Feature;
