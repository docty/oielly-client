import { Children, useEffect, useState } from 'react';
import Intro from "../components/Intro";
import { useAuth } from '../utility/userContext';
import { Link } from 'react-router-dom';
import { Button, Cage, Card,   Flexbox, Grid, Heading, Icon, Image, Paragraph, Span, Table, TableItem, TableRow, TextField } from '@synevix/react-widget';


const Cart = () => {
    const [totalAmount, setTotalAmount] = useState<number>(0);
    return (
        <Cage>
            <Intro name={'Cart'} />
            <Cage className="mx-4 sm:mx-4 lg:mx-32 pt-7 pb-10">
                <Flexbox justifyContent={'center'}>
                     
                    <Paragraph text={"Shopping Cart"} className={'text-pink-500 text-xl uppercase font-bold'}/>
					<Icon name={'icon-arrow-right15'} className={'mx-3'} style={{ fontSize: '1.4rem', lineHeight: '2.0rem' }} />
					<Paragraph text={"Checkout"} className={'text-xl uppercase font-bold'}/>
					<Icon name={'icon-arrow-right15'} className={'mx-3'} style={{ fontSize: '1.4rem', lineHeight: '2.0rem' }} />
					<Paragraph text={"Order Complete"} className={' text-xl uppercase font-bold'}/>
                </Flexbox>
                <Grid className={"mt-7 mb-2 gap-5 grid-cols-3"}>
                    <LeftPane setTotal={(e) => setTotalAmount(e)} />
                    <RightPane totalAmount={totalAmount} />
                </Grid>
            </Cage>
        </Cage>
    );
}

const LeftPane = ({ setTotal }: { setTotal: (e: number) => void }) => {

    const [state, dispatch] = useAuth();
    useEffect(() => {
        setTotal(state.reduce((acu: any, item: any) => acu + item.price * item.quantity, 0));
    }, [setTotal, state])

    const actionButton = (clickedIndex: number, action: string) => {
        const item = state[clickedIndex];
        let newItem = {};
        if (action === 'increase') {
            newItem = { ...item, quantity: item.quantity + 1 };
        } else {
            newItem = { ...item, quantity: item.quantity <= 1 ? 1 : item.quantity - 1 };
        }
        state.splice(clickedIndex, 1, newItem);
        dispatch([...state]);
    }

    const removeItem = (index: number) => {
        state.splice(index, 1);
        dispatch([...state]);
    }

    const clearCart = () => {
        dispatch([]);
    }

    return (
        <Grid className={'col-span-3 md:col-span-2'}>
            <Table className="" header={['Product', 'Name', 'Unit Price', 'Yards', 'Sub Total']}>
                 
                
                    {Children.toArray(state.map((item: any, index: number) => (
                        <TableRow>
                            <TableItem className="">
                                <Image source={item.image.url} width="100" height="100" alt="product" />
                            </TableItem>
                            <TableItem className="">
                                {item.materialName}
                            </TableItem>
                            <TableItem className="">
                                &#8373; {item.price}
                            </TableItem>
                            <TableItem>
                                <Grid style={{ gridTemplateColumns: '30px 50px 30px' }}>
                                    <Button className=" border  p-1 mr-1" icon={'icon-minus3'} onClick={() => actionButton(index, 'decrease')} />
                                    <TextField className="text-black" value={item.quantity} onValueChange={() => null} />
                                    <Button className="border p-1 ml-1" icon={'icon-plus3'} onClick={() => actionButton(index, 'increase')} />
                                </Grid>
                            </TableItem>
                            <TableItem className="">
                                &#8373; {item.price * item.quantity}
                            </TableItem>
                            <TableItem>
                                <i className="icon-cross3 " onClick={() => removeItem(index)}></i>
                            </TableItem>
                        </TableRow>
                    )))}
                
            </Table>
            <Flexbox justifyContent={'between'} className={'mt-4'}>
                <Link to={'/material/gtp'} className="bg-black p-3 rounded text-white">
                    <Icon className="mx-2" name={'icon-arrow-left7'} />
                    Continue Shopping
                </Link>
                <Button bgColor={'gray'} className="rounded text-white p-3" text={'Clear Cart'} onClick={() => clearCart()} />
            </Flexbox>
        </Grid>

    );
}

const RightPane = ({ totalAmount }: { totalAmount: number }) => {
    const ntil = 0.01;
    return (
        <Card className={'col-span-3 md:col-span-1'}>
            <Heading type={'H3'} text={'Carts Total'} className={'bg-gray-800 font-bold text-white py-2 px-4 mb-3 text-base rounded'} />
            <Grid className="grid-cols-3">
                <Heading type={'H4'} text={'Subtotal'} className={'font-bold col-span-2 py-3'} />
                <Paragraph text={'GHC ' + totalAmount} className={'col-span-1 font-bold py-3'} />

                <Heading type={'H4'} text={'Calculate Tax'} className={'col-span-3 font-bold py-3 border-t-2'} />

                <Heading type={'H6'} text={'NTIL'} className={'col-span-2'} />
                <Paragraph text={'1%'} className={'col-span-1'} />
                <Span className={'col-span-3 mt-3 py-3 border-t-2'}></Span>
                <Heading type={'H4'} text={'Total'} className={'font-bold col-span-2'} />
                <Paragraph text={`GHC  ${(totalAmount * ntil) + totalAmount} `} className={'font-bold col-span-1'} />

                <Link to={"/checkout"} className="rounded text-white col-span-3 bg-pink-600 hover:bg-pink-500 p-3 mt-5 uppercase font-bold text-center">Proceed to checkout</Link>
            </Grid>
        </Card>

    )
}
export default Cart;