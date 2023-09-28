import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants' //products_url as url, the second one is the alias, so use it
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

// 2 - 7:
const initialState = {
  isSidebarOpen: false, //hiding sidebar by default
  products_loading: false, //all the products
  products_error: false,
  products: [], //actual product
  featured_products: [], //this is going to be in actual reducer
  /* three state values for the single products */
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  // 1
  const [state, dispatch] = useReducer(reducer, initialState)

  // 2
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  //4
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  // 3 - 4
  /* useEffect(() => {
    openSidebar()
  }, []) */

  // 6
  const fetchProducts = async (url) => {
    // 8
    dispatch({ type: GET_PRODUCTS_BEGIN }) //set up the loading
    try {
      const response = await axios.get(url)
      const products = response.data
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
    /* const response = await axios.get(url) */
    /* console.log(response) */
  }

  // 9
  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const response = await axios.get(url)
      const singleProduct = response.data
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  // 6
  useEffect(() => {
    fetchProducts(url)
  }, [])

  return (
    // 5
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}

/* the first thing that I would want is to wrap my application in product provider. Otherwise, whatever functionality I'm setting up, it's pretty much useless because I'm not going to have access to it. and i have products context as value
in this case I wasn't exporting here in the bottom. I want both of them as far as the products provider and use hook the use product context. so I want to export and then product provider and then export and then the hook. Now look at index.js */

/* 1: I would want to right away use my useReducer, to set up the structure. we are getting back to things, we are getting back to state, that always is going to be our current state, And then the dispatch, So the function that we use to control our state.
So essentially we pass in of course the type into the dispatch and then we go to useReducer, the function that actually controls that state, and that is how we operate on the state using useReducer. This one hook is useful on big projects to avoid bugs and have better organisation, instead of using useState.
On the useReducer() we have to pass two things, the reducer function, that is going to control our initial state (the imported one, called reducer), and then the initial state, that at the moment is an empty object. in order to have some kind of functionality, we would need to dispatch an action. */

/* 2: i'm going to set up two functions, one that closes the sidebar and one that opens it. we start in the intial state creating that property. the first function, openSidebar, is going to be looking for any parameters. And inside of this function we're going to dispatch an action: type - we need to pass the entire property to access the variable -> this will be my action */
/* go on reducers folder, products_reducer.js and then */

/* 3: invoke the function from products_reducer. in the console i should see the object  (type: 'sidebar_open') go back to reducer.
/* a better setup is if we have all our actions in separate place as variables. look at the file actions.js where i have all the actions. clean method. so here i can import the action and call for it to avoid errors */

/* 4: remove the function of n3 point and set up the close one */

/* 5: what's missing is passing the functions and the state. i need to have isSidebarOpen value and to know if sidebar is open or false. I'm setting up the object where first I will spread out my state because eventually there's going to be more values. It's not just the is side bar open, and then i pass the functions */

/* so: we are setting up the provider. We are wrapping our whole application in the product provider. That is very important. And then in the sidebar now since of course, sidebar is in the app, I can access it using my hook.
So we have use product context in the product context. That is my hook just gets me the product context  */

/* Product context Essentially, we'll be responsible for getting my products from the API. It's going to get the product and it's going to get the single product. The reason why I added the sidebar is because I didn't want to create another new context for just a sidebar.
it's a bit of an overkill just to create a new context with new reducer, just to control the sidebar. */

/* go back on sidebar */

/* 6: after setting up Contact.js component, let's fetch here the products from the Api. first i have to be able to access to the products (get back the array in the console), so we need Axios too. we need useEffect in te context because then I can fetch it once and then I'm just going to distribute it.
There's going to be featured ones that will go to the homepage, and then all the products will be dumped in the product page. callback function is [] because i'll invoke it once.
now we can fetch the products. */

/* 7: i also want to handle loading, error and set everything up with useReducer. so i need to add more properties in the initial state */

/* 8: for every action I would want to do, I would need to set up the actual action variable. set up these actions using dispatch. there is going to be an error because we need to set it up in the products_reducer.
we would need to handle two cases, one for error, and then the second one is if everything is successful. -> try and catch (move the response inside try). to avoid the error, go on the products_reducer and hanlde it
And there's two cases, there's one, four featured ones. So we have to filter our existing ones. And the second one is just dumping the products that we're getting into our state property. look always at products_reducer.js
dispatch the error in catch error. once we've got our product in the context now of course, let's worry about rendering them. start with featured ones and then single produts (one more fetch).
Go on FeaturedProducts.js in components */

/* 9: to work with single product, we need fetch function here. each product has a different id. with the function, don-t invoke. dispatch single products actions and state value.
go to products_reducer and after num 3 back here to pass the function down in the value, to access that function.
go on pages, singleProductPage */
