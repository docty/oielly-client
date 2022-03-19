import { Children, useState } from "react";
import {
    Image,
    Cage,
    Flexbox,
    Grid,
    Heading,
    Icon,
    Option,
    Table,
    TableItem,
    TableRow,
    TextArea,
    TextField,
    Button,
    Label,
    Card,
    Radio,
    Paragraph,
} from "@synevix/react-widget";
import oielly from "@synevix/oielly-gateway";
import Intro from "../components/Intro";
import { useAuth } from "../utility/userContext";
import { IGift, IUser } from "../interface/type";
import mtn from '../assets/images/payment/mtn.jpeg';
import vodafone from '../assets/images/payment/vodafone.png';
import airteltigo from '../assets/images/payment/airteltigo.png';

const Checkout = () => {
    const [state, dispatch] = useAuth();
     
    const [note, setNote] = useState<string>('');
    const totalAmount = state.reduce(
        (acu: any, item: any) => acu + item.price * item.quantity,
        0
    );
    const [user, setUser] = useState<IUser>({} as IUser);
    const [gift, setGift] = useState<IGift>({} as IGift);

    const ntil = 0.01;

    const onPlaceOrder = async () => {
         
        window.sessionStorage.setItem('SID_SENO', JSON.stringify(user));
        window.sessionStorage.setItem('SID_XDD', JSON.stringify(state)); 
        
        oielly.wallet.create({
            data: {
                email: user.email,
                amount: totalAmount
            },
            response: (success:any, error) => {
                if (error) {
                    console.error(error);
                    return;
                }
                dispatch([]);
                window.location.href = success.data.authorization_url

            }
        })
        //window.location.href = '/order'
        
    };

    

    const onReturnUser = () => {
        oielly.guest.profile({
            referenceId: localStorage.getItem('token')!,
            response: (success, error) => {
                if (error) { return };
                setUser(success)
            }
        })
    }


    const onGift = () => {
        console.log(gift)
    }
    return (
        <Cage>
            <Intro name={"Checkout"} />
            <Cage className="mx-4 sm:mx-4 lg:mx-32 pt-7 pb-10">
                <Flexbox justifyContent={"center"}>
                    
                    <Paragraph text={"Shopping Cart"} className={' text-xl uppercase font-bold'}/>
					<Icon name={'icon-arrow-right15'} className={'mx-3'} style={{ fontSize: '1.4rem', lineHeight: '2.0rem' }} />
					<Paragraph text={"Checkout"} className={'text-pink-500 text-xl uppercase font-bold'}/>
					<Icon name={'icon-arrow-right15'} className={'mx-3'} style={{ fontSize: '1.4rem', lineHeight: '2.0rem' }} />
					<Paragraph text={"Order Complete"} className={' text-xl uppercase font-bold'}/>
                </Flexbox>
                <Grid className={"mt-7 mb-2 gap-5"} md={"3"}>
                    <Card className={"col-span-3 md:col-span-1"}>
                        <Heading
                            type={"H3"}
                            text={"User Account"}
                            className={
                                "bg-gray-800 font-bold text-white py-2 px-4 mb-3 text-base rounded"
                            }
                        />

                        <Radio text={"Create an account"} name={"account"} onValueChange={() => setUser({} as IUser)} />
                        <Radio text={"Returning user"} name={"account"} onValueChange={onReturnUser} />
                    </Card>
                    <Card className={"col-span-3 md:col-span-2"}>
                        <Heading
                            type={"H3"}
                            text={"Do you Have a Coupon or Voucher Gift"}
                            className={
                                "bg-gray-800 font-bold text-white py-2 px-4 mb-3 text-base rounded"
                            }
                        />
                        <Flexbox justifyContent={"between"} className={"gap-4"}>
                            <Cage>
                                <TextField
                                    placeholder={"Enter coupon here"}
                                    className={" border rounded-tr-none rounded-br-none"}
                                    value={gift.coupon}
                                    onValueChange={(e) => setGift({ ...gift, coupon: e.target.value })}
                                />
                                <Button
                                    text={"Apply Coupon"}
                                    bgColor={"pink"}
                                    className={
                                        "text-white p-2 rounded-tl-none rounded-bl-none border "
                                    }
                                    onClick={onGift}
                                />
                            </Cage>
                            <Cage>
                                <TextField
                                    placeholder={"Enter voucher gift here"}
                                    className={" border rounded-tr-none rounded-br-none"}
                                    value={gift.voucher}
                                    onValueChange={(e) => setGift({ ...gift, voucher: e.target.value })}
                                />
                                <Button
                                    text={"Apply voucher"}
                                    bgColor={"pink"}
                                    className={
                                        "text-white p-2 rounded-tl-none rounded-bl-none border"
                                    }
                                    onClick={onGift}
                                />
                            </Cage>
                        </Flexbox>
                    </Card>
                    <Card className={"col-span-3 md:col-span-1"}>
                        <Heading
                            type={"H3"}
                            text={"Personal Details"}
                            className={
                                "bg-gray-800 font-bold text-white py-2 px-4 mb-3 text-base rounded"
                            }
                        />
                        <Cage>
                            <Label>First Name *</Label>
                            <TextField
                                type="text"
                                placeholder="First Name"
                                value={user.otherName}
                                onValueChange={(e) =>
                                    setUser({ ...user, otherName: e.target.value })
                                }
                                className={"block w-full my-2"}
                            />
                        </Cage>
                        <Cage>
                            <Label>Last Name *</Label>
                            <TextField
                                type="text"
                                placeholder="Last Name"
                                value={user.surname}
                                onValueChange={(e) =>
                                    setUser({ ...user, surname: e.target.value })
                                }
                                className={"block w-full my-2"}
                            />
                        </Cage>
                        <Cage>
                            <Label>Email Address *</Label>
                            <TextField
                                type="text"
                                placeholder="Email Address"
                                value={user.email}
                                onValueChange={(e) =>
                                    setUser({ ...user, email: e.target.value })
                                }
                                className={"block w-full my-2"}
                            />
                        </Cage>
                        <Cage>
                            <Label>Contact *</Label>
                            <TextField
                                type="text"
                                placeholder="Contact"
                                value={user.contact}
                                onValueChange={(e) =>
                                    setUser({ ...user, contact: e.target.value })
                                }
                                className={"block w-full my-2"}
                            />
                        </Cage>
                    </Card>
                    <Card className={"col-span-3 md:col-span-1"}>
                        <Heading
                            type={"H3"}
                            text={"Address Details"}
                            className={
                                "bg-gray-800 font-bold text-white py-2 px-4 mb-3 text-base rounded"
                            }
                        />
                        <Cage>
                            <Label>Country / Region *</Label>
                            <Option
                                value={user.country}
                                item={["Ghana"]}
                                onValueChange={(e) =>
                                    setUser({ ...user, country: e.target.value })
                                }
                                className={"block w-full my-2"}
                            />
                        </Cage>
                        <Cage>
                            <Label>House Address *</Label>
                            <TextField
                                type="text"
                                placeholder="House number and street name"
                                value={user.houseNumber}
                                onValueChange={(e) =>
                                    setUser({ ...user, houseNumber: e.target.value })
                                }
                                className={"block w-full my-2"}
                            />
                        </Cage>
                        <Cage>
                            <Label>GPS Address *</Label>
                            <TextField
                                type="text"
                                placeholder="GP Address (optional)"
                                value={user.gpsAddress}
                                onValueChange={(e) =>
                                    setUser({ ...user, gpsAddress: e.target.value })
                                }
                                className={"block w-full my-2"}
                            />
                        </Cage>
                        <Cage>
                            <Label>Town / City *</Label>
                            <TextField
                                type="text"
                                placeholder="City"
                                value={user.city}
                                onValueChange={(e) =>
                                    setUser({ ...user, city: e.target.value })
                                }
                                className={"block w-full my-2"}
                            />
                        </Cage>
                        <Cage>
                            <Label>Landmark</Label>
                            <TextField
                                type="text"
                                placeholder="Landmark"
                                value={user.landmark}
                                onValueChange={(e) =>
                                    setUser({ ...user, landmark: e.target.value })
                                }
                                className={"block w-full my-2"}
                            />
                        </Cage>
                    </Card>
                    <Card className={"col-span-3 md:col-span-1"}>
                        <Heading
                            type={"H3"}
                            text={"Additional Information"}
                            className={
                                "bg-gray-800 font-bold text-white py-2 px-4 mb-3 text-base rounded"
                            }
                        />
                        <Label>Order Notes (Optional)</Label>
                        <TextArea
                            placeholder={"Additional notes"}
                            className={"block w-full my-2 border outline-none py-2 px-3 "}
                            value={note}
                            onValueChange={(e) =>
                                setNote('')
                            }
                        ></TextArea>
                    </Card>
                    <Card className={"col-span-3 md:col-span-1"}>
                        <Heading
                            type={"H3"}
                            text={"Payment"}
                            className={
                                "bg-gray-800 font-bold text-white py-2 px-4 mb-3 text-base rounded"
                            }
                        />
                        <Paragraph
                            text={
                                "Payment can be done with any of the below mobile operators"
                            }
                        />
                        <Grid style={{ gridTemplateColumns: '60px 60px 100px' }} className={'mt-4 gap-5'}>
                            <Image source={mtn} alt={"mtn"} />
                            <Image source={vodafone} alt={"vodafone"} />
                            <Image source={airteltigo} alt={"airteltigo"} />
                        </Grid>
                    </Card>
                    <Card className="col-span-3 md:col-span-2">
                        <Heading
                            type={"H3"}
                            text={"Your Order"}
                            className={
                                "bg-gray-800 font-bold text-white py-2 px-4 mb-3 text-base rounded"
                            }
                        />
                        <Table header={['Product', 'Total']}>
                             
                                {Children.toArray(
                                    state.map((item: any) => (
                                        <TableRow>
                                            <TableItem>
                                                {item.materialName} <span>×&nbsp; {item.quantity}</span>
                                            </TableItem>
                                            <TableItem>
                                                &#8373; {item.price * item.quantity}
                                            </TableItem>
                                        </TableRow>
                                    ))
                                )}
                                <TableRow className="font-bold text-md text-black">
                                    <TableItem>Subtotal &amp; Tax </TableItem>
                                    <TableItem>
                                        &#8373; {totalAmount * ntil + totalAmount}
                                    </TableItem>
                                </TableRow>
                                <TableRow className="font-bold text-md text-black">
                                    <TableItem> Delivery</TableItem>
                                    <TableItem>&#8373; 0 </TableItem>
                                </TableRow>
                                <TableRow className="font-bold text-md text-black">
                                    <TableItem>Total</TableItem>
                                    <TableItem>
                                        &#8373; {totalAmount * ntil + totalAmount}{" "}
                                    </TableItem>
                                </TableRow>
                             
                        </Table>
                        <Button
                            bgColor={"pink"}
                            className="rounded py-3 my-3 w-full  uppercase font-bold text-white"
                            text={"Place Order"}
                            onClick={() => onPlaceOrder()}
                        />
                    </Card>
                </Grid>
            </Cage>
        </Cage>
    );
};

// placeholder="Notes about your order, e.g. special notes htmlFor delivery"
export default Checkout;
