import React from 'react'
/* import ReactDOM from 'react-dom' */
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

/* dev-vs4d42btmrfw4gvc.us.auth0.com
HVNsdFDDKkKZRv0ZPx88kYrnprVJfKcz
*/

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    authorizationParams={{ redirect_uri: window.location.origin }}
    cacheLocation='localstorage'
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App></App>
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>
)

/* I'm grabbing product provider from products_context.js and now I would want to wrap my app so my app component in that provider, so i can't have any kind of errors. go back on products_context */
/* i need to add CartProvider now when starting to work with cart_context.js. Wrap the app So now anywhere in our app we should have access to the CartProvider.
GO back on cart_context */

/* here we have to set up auth0 and we need to install it: npm install @auth0-react
hook useAuth0; wrap all in UserProvider and GO to user_context */
