import {
  SearchField,
  Cage,
  Flexbox,
  Heading,
  Icon,
  Image,
  Paragraph,
  Grid,
  Button,
  Menu,
  MenuItem,
  MenuSub,
  List,
  ListItem,
  TextField,

} from "@synevix/react-widget";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useAuth } from "../utility/userContext";
import * as css from "../utility/styling";
import Modal from "./Modal";
import oielly from "@synevix/oielly-gateway";
import { ILogin } from "../interface/type";

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);


  return (
    <Cage className={"mb-6"}>
      <HeaderTop />
      <HeaderMiddle state={open} setState={setOpen} />
      <MobileHeader state={open} setState={setOpen} />
      <HeaderBottom />
    </Cage>
  );
};

const HeaderTop = () => {
  const [openModal, setModalOpen] = useState<boolean>(false);
  const [user, setUser] = useState<ILogin>({ email: 'guest@test.com', password: '16009A' } as ILogin)
  const history = useHistory();

  const signIn = () => {
    setModalOpen(false);
    oielly.guest.login({
      data: { ...user },
      response: (success: any, error) => {
        if (error) { console.error(error); return }

        if (success.message) {
          window.sessionStorage.setItem('auth-token', success.token)
          window.sessionStorage.setItem('referenceId', success.referenceId)
        }
        history.push('/account')
      }
    })

  }
  return (
    <Flexbox
      justifyContent={"between"}
      className={"sm:px-4 lg:px-32 px-4 py-3 bg-black text-white"}
    >
      <Paragraph text={"Welcome to Oielly"} />
      <Cage>
        <Link to={"/contact-us"} className={"sr-only md:not-sr-only mx-5"}>
          <Icon name="icon-location3" className={"mx-3"} />
          Contact
        </Link>
        {/* <Link to={"/assistance"} className={"sr-only md:not-sr-only mx-5"}>
          <Icon name="icon-info22" className={"mx-3 ml-5"} />
          Need Assistance
        </Link> */}
        <Link to={"#"} className={"mx-5"} onClick={() => setModalOpen(true)}>
          <Icon name="icon-user" className={"mx-3"} />
          Sign in
        </Link>
      </Cage>

      <Modal isOpen={openModal} title={'Sign In'} setOpen={() => setModalOpen(false)} >
        <TextField type={'email'} placeholder={'Enter Email Address'} className={'w-full my-3 text-black'} value={user.email} onValueChange={(e) => setUser({ ...user, email: e.target.value })} />
        <TextField type={'password'} placeholder={'Enter Password'} className={'w-full my-3 text-black'} value={user.password} onValueChange={(e) => setUser({ ...user, password: e.target.value })} />
        <Cage className={'w-full flex justify-center'}>
          <Button text={'Sign In'} bgColor={'pink'} className={'p-2 w-5/12 mx-auto rounded-sm'} onClick={signIn} />
        </Cage>
      </Modal>

    </Flexbox>
  );
}

const HeaderMiddle = (props: IMenuButton) => {
  const [search, setSearch] = useState<string>("");
  const [state] = useAuth();

  const onSearch = (e: any) => {
    e.preventDefault();
  };

  return (
    <Grid className={"px-4 sm:px-4 lg:px-32 py-5 gap-5 m-0 grid-cols-5"}>
      <Link to={"/"} className="col-span-4 md:col-span-1">
        <Image source={logo} alt="logo" width="153" height="44" />
      </Link>
      <Button
        iconSize={"25px"}
        onClick={() => props.setState(true)}
        icon={"icon-menu7"}
        className={"md:sr-only hover:text-pink-300 bg-transparent"}
        style={{background: 'transparent'}}
      />

      <form
        onSubmit={(e) => onSearch(e)}
        className={"sr-only md:not-sr-only col-span-5 md:col-span-2"}
      >
        <SearchField
          placeholder="Search..."
          value={search}
          onValueChange={(e: any) => setSearch(e.target.value)}
        />
      </form>
      <hr className={"col-span-5 md:sr-only"} />
      <Flexbox
        className="gap-8 col-span-5 md:col-span-2"
        justifyContent={"around"}
      >
        <a href="tel:233247049416" className={"flex flex-wrap gap-2"}>
          <Icon
            name={"icon-phone2"}
            style={{ display: "flex", alignItems: "center", fontSize: "2rem" }}
          />
          <Cage>
            <Heading type={"H4"} text={"Call Us Now"} className={'text-xs'} />
            <Paragraph text={"(233) 247-049-416"} className={'font-bold'} />
          </Cage>
        </a>

        <Link to={"/cart"} className={"flex flex-wrap gap-2"}>
          <Cage>
            <Heading type={"H4"} text={"My Cart"} className={'text-xs'} />
            <Paragraph text={"GHC 0.00"} className={'font-bold'} />
          </Cage>
          <Cage className={"relative"}>
            <Icon
              name={"icon-cart5"}
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "2rem",
              }}
            />
            <span className={[css.cartCount, 'bg-pink-600 text-white absolute text-center'].join(' ')}>{state?.length}</span>
          </Cage>
        </Link>
      </Flexbox>
    </Grid>
  );
};

const HeaderBottom = () => {
  return (
    <Flexbox justifyContent={"center"} className={"sr-only  md:not-sr-only"}>
      <List type={"unordered"} className="flex flex-wrap">
        <ListItem className="active">
          <Link to={"/"} className={"px-5 py-2 font-bold"}>
            Home
          </Link>
        </ListItem>
        <ListItem className={"relative " + css.menutItem}>
          <Link to="#product" className={"px-3 py-2 font-bold"}>
            Material
            <Icon
              name={"icon-arrow-down22"}
              style={{ fontSize: "1.5rem" }}
              className={"ml-2"}
            />
          </Link>
          <List
            type={"unordered"}
            className={"absolute w-full z-30 p-1  bg-white shadow-md invisible"}
          >
            <ListItem>
              <Link
                to={"/material/gtp"}
                className={"hover:bg-gray-100  block px-2 py-1"}
              >
                GTP
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to={"/material/holland"}
                className={"hover:bg-gray-100  block px-2 py-1"}
              >
                Holland{" "}
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to={"/material/woodin"}
                className={"hover:bg-gray-100  block px-2 py-1"}
              >
                Woodin
              </Link>
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Link to={"/blog"} className={"px-5 py-2 font-bold"}>
            Blog
          </Link>
        </ListItem>
        <ListItem>
          <Link to={"/about-us"} className={"px-5 py-2 font-bold"}>
            About Us
          </Link>
        </ListItem>
      </List>
    </Flexbox>
  );
};

const MobileHeader = (props: IMenuButton) => {
  const [search, setSearch] = useState<string>("");

  const onSearch = (e: any) => {
    e.preventDefault();
  };

  return (
    <div
      className={`${css.mobileWrapper}  ${props.state === false ? " left-full -right-full" : " left-14 right-0"
        }`}
    >
      <Button
        iconSize={"25px"}
        className={"text-white p-3 hover:text-pink-300 bg-transparent"}
        style={{background: 'transparent'}}
        icon={"icon-cross2"}
        onClick={() => props.setState(false)}
      />
      <form onSubmit={(e) => onSearch(e)} className={"my-5 mb-8 mx-3"}>
        <SearchField
          placeholder="Search..."
          value={search}
          onValueChange={(e: any) => setSearch(e.target.value)}
        />
      </form>
      <Menu className={"mx-3"}>
        <MenuItem text={"HOME"} url={"/"} />
        <MenuItem text={"MATERIAL"} url={"/material"} hasSub>
          <MenuSub text={"GTP"} url={"/material/gtp"} />
          <MenuSub text={"Holland"} url={"/material/holland"} />
          <MenuSub text={"Woodin"} url={"/material/woodin"} />
        </MenuItem>
        <MenuItem text={"BLOG"} url={"/blog"} />
        <MenuItem text={"ABOUT US"} url={"/about-us"} />
      </Menu>
    </div>
  );
};



interface IMenuButton {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}
export default Header;
