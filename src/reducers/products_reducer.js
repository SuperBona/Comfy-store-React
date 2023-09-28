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

const products_reducer = (state, action) => {
  // 1
  if (action.type === SIDEBAR_OPEN) {
    /* console.log(action) */
    return { ...state, isSidebarOpen: true }
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false }
  }
  // 2
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true }
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    //update both the arrays. important to return a state
    const featured_products = action.payload.filter(
      (product) => product.featured === true
    )
    return {
      ...state,
      products_loading: false,
      products: action.payload,
      featured_products,
    }
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_loading: false, products_error: true }
  }
  // 3
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      single_product_loading: true,
      single_product_error: false,
    }
  }
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product: action.payload,
    }
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
    }
  }
  /* return state */ //important, if this isn't here, error
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer

/* in this function, products_reducer, we're getting state and we're getting a action. so action is something we would want to do. And State is the current state or old state before the update. 
So I'm going to get my state and then once I'm done with my action, whatever it is, then of course I will just want to return that new state. */

/* 1: set up sidebar functionalities with conditions. back to products_context. 
if the action type is sidebarOpen, then of course I would want to return the state. So my current state, but of course I would want to change the value for the property off. */

/* 2: set up products functionalities needed in products_context.js. once we start fetching the product, I'll set get_products_begin equal to true. somewhere in our project we will be looking for this property for the value.
And then depending on that there's going to be a spinner or there's not going to be a spinner.
I would want to set my products so the product array to my full payload and then feature products will be equal to the new. */

/* 3: single products. go on context, products_context.js to pass the function down */
