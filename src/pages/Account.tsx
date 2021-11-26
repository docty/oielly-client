import oielly from "@synevix/oielly-gateway";
import { Cage, Grid, Card, Heading, Paragraph, Table, TableRow, TableHeader, TableItem, Button, TextField } from "@synevix/react-widget"
import { Children, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { IUser } from "../interface/type";

const Account = () => {
    const [state, setState] = useState<number>(0);
    const history = useHistory();
    
    const logout = () => {
        window.sessionStorage.removeItem('auth-token');
        window.sessionStorage.removeItem('referenceId');
        history.replace('/')
    }

    return (
        <Cage className={'mx-4 sm:mx-4 lg:mx-32 mt-5 mb-7'}>
            <Grid md={'3'} gap={'5'}>
                <Card className={'border col-span-3 md:col-span-1'}>
                    <Link to={'#dashboard'} onClick={() => setState(0)} className={`block font-bold text-base p-3 hover:bg-pink-200 rounded ${state === 0 ? ' active-menu ' : ''}`}>Dashboard</Link>
                    <Link to={'#orders'} onClick={() => setState(1)} className={`block font-bold text-base p-3 hover:bg-pink-200 rounded ${state === 1 ? ' active-menu ' : ''}`}>Orders</Link>
                    <Link to={'#address'} onClick={() => setState(2)} className={`block font-bold text-base p-3 hover:bg-pink-200 rounded ${state === 2 ? ' active-menu ' : ''}`}>Address</Link>
                    <Link to={'#settings'} onClick={() => setState(3)} className={`block font-bold text-base p-3 hover:bg-pink-200 rounded ${state === 3 ? ' active-menu ' : ''}`}>Settings</Link>
                    <Link to={'#logout'} onClick={logout} className={`block font-bold text-base p-3 hover:bg-pink-200 rounded ${state === 4 ? ' active-menu ' : ''}`}>Logout</Link>
                </Card>

                <Card className={'border col-span-3 md:col-span-2'}>
                    {state === 0 ? <Dashboard /> : null}
                    {state === 1 ? <Orders /> : null}
                    {state === 2 ? <Address /> : null}
                    {state === 3 ? <Settings /> : null}
                </Card>
            </Grid>
        </Cage>
    )
}

const Dashboard = () => (
    <>
        <Heading type={'H3'} text={'Dashboard'} className={'font-bold bg-gray-800 p-2 px-4 rounded text-white m-0 text-base'} />

    </>
)
const Orders = () => {
    const [order,] = useState<any[]>([]);
    return (
        <>
            <Heading type={'H3'} text={'Orders'} className={'font-bold bg-gray-800 p-2 px-4 rounded text-white mb-3 text-base'} />
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader>SN</TableHeader>
                        <TableHeader>Item</TableHeader>
                        <TableHeader>Price (GHC)</TableHeader>
                        <TableHeader>Action</TableHeader>
                    </TableRow>
                </thead>
                <tbody>

                    {
                        Children.toArray(order.map(item => (
                            <TableRow>
                                <TableItem>1</TableItem>
                                <TableItem>Atimpo</TableItem>
                                <TableItem>50.99</TableItem>
                                <TableItem><Button icon={'icon-user'} bgColor={'green'} className={'text-white p-1 rounded'} /></TableItem>
                            </TableRow>
                        )))


                    }


                </tbody>
            </Table>
        </>
    )
}
const Address = () => {
    const [user, setUser] = useState<IUser>({} as IUser);
    useEffect(() => {
        oielly.guest.profile({
            referenceId: window.sessionStorage.getItem('referenceId')!,
            response: (success, error) => {
                if (error) { return };
                console.log(success)
                setUser(success)
            }
        })

    }, [])
    return (
        <>
            <Heading type={'H3'} text={'Address'} className={'font-bold bg-gray-800 p-2 px-4 rounded text-white m-0 text-base'} />
            <Paragraph text={`${user.surname} ${user.otherName}`} className={'capitalize my-4 text-base font-bold'} />
            <Paragraph text={user.houseNumber} className={'capitalize my-2 text-base'} />
            <Paragraph text={user.gpsAddress} className={'capitalize my-2 text-base '} />
            <Paragraph text={user.contact} className={'capitalize my-2 text-base '} />
            <Paragraph text={user.email} className={' my-2 text-base '} />
        </>
    )
}

const Settings = () => {
    const [user, setUser] = useState<IUser>({} as IUser);

    useEffect(() => {
        oielly.guest.profile({
            referenceId: window.sessionStorage.getItem('referenceId')!,
            response: (success, error) => {
                if (error) { return };
                setUser(success)
            }
        })
    }, [])

    const submitChanges = () => {
        oielly.guest.update({
            referenceId: window.sessionStorage.getItem('referenceId')!,
            data: { ...user },
            response: (success, error) => {
                if (error) { console.log(error); return };
                console.log(success)
            }
        })
    }
    return (
        <>
            <Heading type={'H3'} text={'Settings'} className={'font-bold bg-gray-800 p-2 px-4 rounded text-white mb-3 text-base'} />
            <Grid md={'2'} gap={'5'}>
                <TextField placeholder={'First Name'} value={user.otherName} onValueChange={(e) => setUser({ ...user, otherName: e.target.value })} />
                <TextField placeholder={'Last Name'} value={user.surname} onValueChange={(e) => setUser({ ...user, surname: e.target.value })} />
                <TextField placeholder={'Contact'} value={user.contact} onValueChange={(e) => setUser({ ...user, contact: e.target.value })} />
                <TextField placeholder={'Email Address'} value={user.email} onValueChange={(e) => setUser({ ...user, email: e.target.value })} />
                <TextField placeholder={'House Address'} value={user.houseNumber} onValueChange={(e) => setUser({ ...user, houseNumber: e.target.value })} />
                <TextField placeholder={'GPS Address'} value={user.gpsAddress} onValueChange={(e) => setUser({ ...user, gpsAddress: e.target.value })} />
            </Grid>
            <Button text={'Save'} bgColor={'pink'} className={'mt-3 text-white p-2 w-4/12'} onClick={submitChanges} />

        </>
    )
}
export default Account