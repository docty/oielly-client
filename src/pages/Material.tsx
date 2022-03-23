import { useEffect, useState, Children, useRef } from "react";
import { SearchField, Button, Grid, Cage, Heading, Flexbox, Option, Paragraph, Image, Card } from "@synevix/react-widget";
import { Link, useParams } from "react-router-dom";
import oielly from '@synevix/oielly-gateway';
import Intro from "../components/Intro";
import { IProduct } from "../interface/type";
import { useAuth } from "../utility/userContext";
import shop1 from '../assets/images/item1.png';
import { Box } from "../components/Box";
import { Toast } from "../components/Toast";



const Material = () => {
    const [materials, setMaterials] = useState<IProduct[]>([]);

    const params = useParams<{ id: string }>();

    useEffect(() => {
        oielly.product.list({
            category: params.id,
            response: (success: any, error: any) => {
                if (error) { console.error(error); return }
                setMaterials(success)
            }
        })

    }, [params.id]);
    return (
        <Cage className={'mb-5'}>
            <Intro name={'Material'} />
            <Grid className={'mx-4 sm:mx-4 lg:mx-32 mt-5 gap-5 grid-cols-4 '}>
                <LeftPane />
                <RightPane data={materials} />
            </Grid>

        </Cage>
    )
}

const LeftPane = () => (
    <Cage className={'col-span-4 md:col-span-1'}>
        <Cage>
            <SearchField
                className={''}
                placeholder="Search..."
                value={''}
                onValueChange={(e:any) => console.log(e.target.value)}
            />
        </Cage>
        <Flexbox>
            <Cage className="my-5">
                <Heading type={'H3'} text={'Categories'} className={'font-bold text-2xl my-5'} />
                <Flexbox gap={'3'}>
                    <Box className={'px-2 py-2 flex-1 text-center hover:bg-black hover:text-white'}><Link to={'/material/gtp'}>GTP</Link></Box>
                    <Box className={'px-2 py-2 flex-1 text-center  hover:bg-black hover:text-white'}><Link to={'/material/woodin'}>Woodin</Link></Box>
                    <Box className={'px-2 py-2 flex-1 text-center  hover:bg-black hover:text-white'}><Link to={'/material/holland'}>Holland </Link></Box>

                </Flexbox>

            </Cage>
        </Flexbox>
    </Cage>
)
const RightPane = ({ data }: { data: IProduct[] }) => {
    const [state, dispatch] = useAuth();
    const [sortBy, setSortBy] = useState('');
    const toastRef = useRef<HTMLDivElement>(null);

    const addToCart = (data: IProduct) => {
        toastRef.current!.style.left = '4px';
        const { id, materialName, price, imageUrl, productId } = data;
        dispatch([...state, { id, materialName, productId, price, quantity: 1, image: imageUrl[0] }]);
        setTimeout(() => {
            toastRef.current!.style.left = '-500px';
        }, 3000)
    }

    useEffect(() => {
        // TODO Filter item by sortby
    }, [sortBy])
 
    return (
        <Cage className={'col-span-4 md:col-span-3 '}>
            <Flexbox justifyContent={'end'} className={'mb-4'} >
                <Cage className={'flex flex-wrap'}>
                    <Paragraph text={'Sort By'} className={' mx-3 mt-2'} />
                    <Option
                        item={['Default', 'Most Popular', 'Average rating', 'Latest']}
                        value={sortBy}
                        onValueChange={(e) => setSortBy(e.target.value)}
                    />
                </Cage>
            </Flexbox>
            <Grid lg={'3'} md={'2'} sm={'1'} gap={'4'}>
                {Children.toArray(data.map((item: IProduct) => (
                    <Product  {...item} addToCart={addToCart} />
                )))}
            </Grid>
             
            <Toast
                className={'mt-3 -left-80'}
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
                    <Image source={shop1} alt="product" />
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
export default Material;
