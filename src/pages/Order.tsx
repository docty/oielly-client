import Intro from "../components/Intro";
import { Cage, Card, Flexbox, Grid, Heading, Icon, Paragraph, Table, TableItem, TableRow } from "@docty68/widget";
import { Children, useCallback, useEffect, useState } from "react";
import { IUser } from "../interface/type";
import oielly from "@docty68/oielly-gateway";
import { useLocation } from 'react-router-dom';
import {  Document, Page, Text, View, PDFDownloadLink } from "@react-pdf/renderer";

const Order = () => {

	const [product, setProduct] = useState<any>();
	const [user, setUser] = useState<IUser>({} as IUser);
	const [orderId, setOrderId] = useState('');
	const location = useLocation();
	let params = new URLSearchParams(location.search);
	const reference = params.get('reference');

	const ntil = 0.01;

	useEffect(() => {
		setUser(JSON.parse(window.sessionStorage.getItem('SID_SENO')!));
		setProduct(JSON.parse(window.sessionStorage.getItem('SID_XDD')!));
	}, [])

	const sendOrder = useCallback((guestId: string) => {

		const productId: string[] = [];
		const quantity: string[] = [];
		const price: string[] = [];
		const product = JSON.parse(window.sessionStorage.getItem('SID_XDD')!);

		product && product.forEach(async (item: any) => {
			productId.push(item.productId);
			quantity.push(item.quantity);
			price.push(item.price);
		});

		const dataSet = {
			guestId: guestId,
			productId: productId.join("~~"),
			quantity: quantity.join("~~"),
			price: price.join("~~"),
			message: 'note',
			transactionId: reference!
		};

		oielly.order.create({
			data: dataSet,
			response: (result: any, error: any) => {
				if (error) {
					console.log(error);
					return;
				}
				setOrderId(result.orderId);

				window.sessionStorage.clear();

			},
		});
	}, [reference]);

	const createGuest = useCallback(() => {
		oielly.guest.create({
			data: JSON.parse(window.sessionStorage.getItem('SID_SENO')!),
			response: (success: any, error: any) => {
				if (error) {
					console.error(error);
					return;
				}
				sendOrder(success.guestId)

			},

		});
	}, [sendOrder]);

	useEffect(() => {
		oielly.wallet.verify({
			reference: reference!,
			response: (success, error) => {
				if (error) {
					console.error(error);
					return;
				}
				if (success.status) {
					createGuest();
				} else {
					console.log('Failed')
				}

			}
		})

	}, [createGuest, reference]);



	const CreatePDF = () => {
		const MyDoc = () => (
			<Document>
				<Page size={'A4'}>
					<View style={{display: 'flex', justifyContent: 'space-between'}}>
						<Text>PLOT 42 BLOCK C TANOSO</Text>
						<Text>INVOICE</Text>
					</View>
					<View>
						<Text>Date: October 29, 2021</Text>
					</View>
				</Page>
			</Document>
		)
		return (
			<Flexbox justifyContent={'center'} className={'my-4'}>
				<PDFDownloadLink document={<MyDoc />} fileName={'henry.pdf'} className={'bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-sm'}>
					{
						({ blob, url, loading, error }) => {
							return (loading ? 'loading document..' : 'Download invoice')
						}
					}
				</PDFDownloadLink>
			</Flexbox>
		)
	}

	return (
		<>
			<Intro name={'Order'} />
			<Cage className="mx-4 sm:mx-4 lg:mx-32 pt-7 pb-10">
				<Flexbox justifyContent={'center'}>
					<Paragraph text={"Shopping Cart"} className={'text-xl uppercase font-bold'} />
					<Icon name={'icon-arrow-right15'} className={'mx-3'} style={{ fontSize: '1.4rem', lineHeight: '2.0rem' }} />
					<Paragraph text={"Checkout"} className={'text-xl uppercase font-bold'} />
					<Icon name={'icon-arrow-right15'} className={'mx-3'} style={{ fontSize: '1.4rem', lineHeight: '2.0rem' }} />
					<Paragraph text={"Order Complete"} className={'text-pink-500 text-xl uppercase font-bold'} />

				</Flexbox>

				<Flexbox justifyContent={'center'}>
					<Card className={'mt-8 p-5 flex gap-4'}>
						<Icon name={'icon-thumbs-up2'} className={'text-pink-500'} style={{ fontSize: '3rem' }} />
						<Cage>
							<Heading type={'H2'} text={'Thank You'} className={'uppercase font-bold text-2xl'} />
							<Paragraph text={'Your order has been received successfuly'} className={'text-gray-600'} />
						</Cage>
					</Card>
				</Flexbox>

				<CreatePDF />
				<Grid md={'3'} className={'mt-12'} gap={'4'}>
					<Card>
						<Heading type={'H3'} text={'Summary'} className={'bg-gray-800 font-bold text-white py-2 px-4 mb-3 text-base rounded'} />
						<Table>
							<tbody>
								<TableRow>
									<TableItem>Order ID</TableItem>
									<TableItem>{orderId}</TableItem>
								</TableRow>
								<TableRow>
									<TableItem>Surname</TableItem>
									<TableItem>{user?.surname}</TableItem>
								</TableRow>
								<TableRow>
									<TableItem>Other Name</TableItem>
									<TableItem>{user?.otherName}</TableItem>
								</TableRow>
								<TableRow>
									<TableItem>Contact</TableItem>
									<TableItem>{user?.contact}</TableItem>
								</TableRow>
								<TableRow>
									<TableItem>Email</TableItem>
									<TableItem>{user?.email}</TableItem>
								</TableRow>
								<TableRow>
									<TableItem>Date</TableItem>
									<TableItem>09-28-2021</TableItem>
								</TableRow>
							</tbody>
						</Table>
					</Card>
					<Card>
						<Heading type={'H3'} text={'Address'} className={'bg-gray-800 font-bold text-white py-2 px-4 mb-3 text-base rounded'} />
						<Table>
							<tbody>
								<TableRow>
									<TableItem>Country</TableItem>
									<TableItem>{user?.country}</TableItem>
								</TableRow>
								<TableRow>
									<TableItem>City</TableItem>
									<TableItem>{user?.city}</TableItem>
								</TableRow>
								<TableRow>
									<TableItem>House Address</TableItem>
									<TableItem>{user?.houseNumber}</TableItem>
								</TableRow>
								<TableRow>
									<TableItem>GPS</TableItem>
									<TableItem>{user?.gpsAddress}</TableItem>
								</TableRow>
								<TableRow>
									<TableItem>Landmark</TableItem>
									<TableItem>{user?.landmark}</TableItem>
								</TableRow>
							</tbody>
						</Table>
					</Card>
					<Card>
						<Heading type={'H3'} text={'Order'} className={'bg-gray-800 font-bold text-white py-2 px-4 mb-3 text-base rounded'} />
						<Table>
							<tbody>

								{Children.toArray(
									product?.map((item: any) => (
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
										&#8373; {product && product.reduce((acu: any, item: any) => acu + item.price * item.quantity, 0) * ntil + product && product.reduce((acu: any, item: any) => acu + item.price * item.quantity, 0)}
									</TableItem>
								</TableRow>
								<TableRow>
									<TableItem>Delivery Fee</TableItem>
									<TableItem>&#8373; 0 </TableItem>
								</TableRow>
								<TableRow className="font-bold text-md text-black">
									<TableItem>Total</TableItem>
									<TableItem>
										&#8373; {product && product.reduce((acu: any, item: any) => acu + item.price * item.quantity, 0) * ntil + product && product.reduce((acu: any, item: any) => acu + item.price * item.quantity, 0)}{" "}
									</TableItem>
								</TableRow>

							</tbody>
						</Table>
					</Card>
				</Grid>
			</Cage>
		</>

	)
}

export default Order;