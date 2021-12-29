import { useEffect, useRef, useState } from 'react';
import { Cage, Grid, Heading, Image, Paragraph, Button, TextField, TextArea, Table, TableRow, TableItem, Flexbox } from '@synevix/react-widget';
import oielly from '@synevix/oielly-gateway';
import ReactGA from 'react-ga';
import { Tab as Tabbing, TabItem as TabItems } from "../components/Tab";
import Intro from "../components/Intro";
import { IReview, IView } from '../interface/type';
import { useAuth } from '../utility/userContext';
import { useParams } from 'react-router-dom';
import image2 from '../assets/images/categories/item_1.png';
import image3 from '../assets/images/categories/item2.png';
import { Toast } from "../components/Toast";
import { Rating } from '../components/Rating';

const View = () => {
    const [product, setProduct] = useState<IView>({} as IView);
    const params = useParams<{ id: string }>();
    useEffect(() => {

        oielly.product.profile({
            referenceId: params.id,
            response: (success: any, error: any) => {
                if (error) { console.error(error); return }
                setProduct(success);

            }
        })
    }, [params]);
    return (
        <Cage className={'mb-5'}>
            <Intro name={'Product Details'} />
            <Cage className={'mx-4 sm:mx-4 lg:mx-32 mt-5 '}>
                <GetDetails {...product} />
                <GetDescription {...product} />
            </Cage>
        </Cage>
    )
}
const GetDetails = (props: IView) => {
    const [state, dispatch] = useAuth();
    const toastRef = useRef<HTMLDivElement>(null);
    const [currentImage, setCurrentImage] = useState<number>(1);
    const addToCart = (data: any) => {
        toastRef.current!.style.left = '4px';
        const { id, materialName, price, imageUrl, productId } = data;

        dispatch([...state, { id, materialName, productId, price, quantity: 1, image: imageUrl[0] }]);
        setTimeout(() => {
            toastRef.current!.style.left = '-500px';
        }, 3000)
        ReactGA.event({
            category: 'User',
            action: 'Added to cart'
        });
    }





    return (
        <Grid md={'2'} gap={'5'} className="">
            {/* TODO Image not showing */}
            <Flexbox gap='1' >
                <Flexbox direction='col' className='flex-1 h-full' style={{ height: '610px' }}>
                    <Cage className='border cursor-pointer' onClick={() => setCurrentImage(1)}>
                        <Image source={image2} alt={'Item'} style={{ height: '150px', width: '100%' }} className='mx-auto my-1' />
                    </Cage>
                    <Cage className='  border cursor-pointer' onClick={() => setCurrentImage(2)}>
                        <Image source={image3} alt={'Item'} style={{ height: '150px', width: '100%' }} className='mx-auto my-1' />
                    </Cage>


                </Flexbox>
                <Cage style={{ flex: 3, }}>
                    <Image source={image2} alt={'Item'}  className={`h-full ${currentImage !== 1 && 'hidden'}`} />
                    <Image source={image3} alt={'Item'} className={`h-full ${currentImage !== 2 && 'hidden'}`} />

                </Cage>

            </Flexbox>
            <Cage>
                <Heading type={'H1'} text={props.materialName} className="font-bold text-3xl capitalise" />
                <Paragraph text={'CATEGORY ' + props.category} className={'text-xs my-4'} />
                <Paragraph text={'TAG ' + props.tag} className={'text-xs my-4'} />
                <Paragraph text={'GHC ' + props.price} className={'text-3xl text-pink-400 my-4 font-bold'} />
                <Rating value={2} className={'my-4'} />
                <Paragraph text={'REVIEW ' + props.review?.length} />
                <Paragraph text={'ORDER ' + props.order} />
                <Button text={'Add To Cart'} onClick={() => addToCart(props)} bgColor={'pink'} className={'text-white font-bold mt-4 px-5 py-3'} />
            </Cage>
            <Toast
                className={'mt-3 -left-96'}
                refs={toastRef}
                title={'Cart'}
                message={'Material has been added to cart'}
            />
        </Grid>
    );
};

const GetDescription = (props: IView) => {

    const [review, setReview] = useState({} as IReview);
    const onSubmitComment = (e: any) => {
        e.preventDefault();
        oielly.review.create({
            data: { ...review, productId: props.productId },
            response: (success, error) => {
                if (error) { return }
                console.log(success)
            }
        })
        console.log(review);
    }
    return (
        <Cage className={'mt-5 w-full'}>
            <Tabbing direction={'col'}>
                <TabItems text={'Specifications'}>
                    <Table className={'mt-4'} header={['Property', 'Value']}>

                        <TableRow>
                            <TableItem>Material</TableItem>
                            <TableItem className="pl-4">{props.materialName}</TableItem>
                        </TableRow>
                        <TableRow>
                            <TableItem >Brand </TableItem >
                            <TableItem className="pl-4">{props.manufacturerBrand}</TableItem>
                        </TableRow>
                        <TableRow>
                            <TableItem>Price
                            </TableItem>
                            <TableItem className="pl-4">{'GHC ' + props.price}</TableItem>
                        </TableRow>
                        <TableRow>
                            <TableItem>
                                Categories</TableItem>
                            <TableItem className="border-no pl-4">{props.category}</TableItem>
                        </TableRow>
                        <TableRow>
                            <TableItem>
                                Tag</TableItem >
                            <TableItem className="border-no pl-4">{props.tag}</TableItem>
                        </TableRow>

                    </Table>
                </TabItems>
                <TabItems text={'Description'}>
                    <Cage className={'mt-4'}>
                        <p>{props.description}</p>
                    </Cage>
                </TabItems>
                <TabItems text={'Reviews'}>
                    <div className="comments pt-2 pb-10 border-no">
                        <ul>
                            {props.review?.map(item => (
                                <li>
                                    <div className="comment">
                                        <figure className="comment-media">
                                            <a href="#im">
                                                <img src="images/blog/comments/1.jpg" alt="avatar" />
                                            </a>
                                        </figure>
                                        <div className="comment-body">
                                            <div className="comment-rating ratings-container mb-0">
                                                <div className="ratings-full">
                                                    <span className="ratings" style={{ width: "80%" }}></span>
                                                    <span className="tooltiptext tooltip-top">4.00</span>
                                                </div>
                                            </div>
                                            <div className="comment-user">
                                                <span className="comment-date text-body">{item.dateCreated}</span>
                                                <h4><a href="#name">{item.name}</a></h4>
                                            </div>

                                            <div className="comment-content">
                                                <p>{item.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="">
                        <div className=" my-3">
                            <h3 className="">Add a Review</h3>
                            <p>Your email address will not be published. Required fields are marked *</p>
                        </div>
                        <div className="rating-form">



                            <select name="rating" id="rating" required style={{ display: "none" }}>
                                <option value="">Rate…</option>
                                <option value="5">Perfect</option>
                                <option value="4">Good</option>
                                <option value="3">Average</option>
                                <option value="2">Not that bad</option>
                                <option value="1">Very poor</option>
                            </select>
                        </div>
                        <form onSubmit={(e) => onSubmitComment(e)}>
                            <Grid md={'2'} gap={'4'} className="my-4">
                                <TextField type="text" placeholder="Name *" value={review.name} onValueChange={(e) => setReview({ ...review, name: e.target.value })} />
                                <TextField type="email" placeholder="Email *" value={review.email} onValueChange={(e) => setReview({ ...review, email: e.target.value })} />
                            </Grid>
                            <TextArea className="w-full mb-4" placeholder="Comment *" onValueChange={(e) => setReview({ ...review, message: e.target.value })}></TextArea>

                            <Button type="submit" className="px-4 py-2 text-white" text={'Submit'} bgColor={'pink'} />
                        </form>
                    </div>
                </TabItems>
            </Tabbing>
        </Cage>
    );
};


export default View;