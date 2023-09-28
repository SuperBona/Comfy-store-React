/* here i set up all the imports from different directories. import - export. 
look the same with index.js in Components folder */

import Home from './HomePage'
import Products from './ProductsPage'
import SingleProduct from './SingleProductPage'
import About from './AboutPage'
import Cart from './CartPage'
import Error from './ErrorPage'
import Checkout from './CheckoutPage'

/* this one is to prevent non-users to go in checkout page */
import PrivateRoute from './PrivateRoute'
import AuthWrapper from './AuthWrapper'

export {
  Home,
  Products,
  SingleProduct,
  About,
  Cart,
  Error,
  Checkout,
  PrivateRoute,
  AuthWrapper,
}

/* let's import the AuthWrapper and then go on App.js */
