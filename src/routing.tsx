import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Material from './pages/Material';
import Style from './pages/Style';
import View from './pages/View';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { Fragment } from 'react';
import { Standard, } from './utility/userContext';
import Order from './pages/Order';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Blog_View from './pages/Blog_View';
import Header from './components/Header';
import Footer from './components/Footer';
import RouteNotFound from './pages/404';
import Faq from './pages/Faq';
import Account from './pages/Account';
import RouterChangeTracker from './utility/RouterChangeTracker';
// TODO Add 404 page
const routing =
  <Router>
    <Switch>
      <Fragment>
        <Standard>
          <Header />
          <Route path="/material/:id"   component={Material} />
          <Route path="/view/:id" component={View} />
          <Route path="/style" component={Style} />
          <Route path="/cart" component={Cart}  />
          <Route path="/checkout" component={Checkout} />
          <Route path="/order" component={Order} />
          <Route path="/about-us" component={About} />
          <Route path='/contact-us' component={Contact} />
          <Route path='/blog' component={Blog}  />
          <Route path='/blog/:referenceId' component={Blog_View} />
          <Route path="/faq" component={Faq} />
          <Route path="/account" component={Account} />
          <Route path="/" component={Home}  />
          <Route path="**" component={RouteNotFound} />
          <Footer />
          <RouterChangeTracker/>
        </Standard>
      </Fragment>
    </Switch>
  </Router>

export default routing;