import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

// 6
const getLocalStorage = () => {
  let cart = localStorage.getItem('cart')
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'))
  } else {
    return []
  }
}

// 1 - 6
const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amout: 0,
  shipping_fee: 534,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  // 2
  const [state, dispatch] = useReducer(reducer, initialState)

  // 3
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } })
  }

  // 4 - 7 - 8
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
  }
  const toggleAmount = (id, value) => {
    /*  console.log(id, value) */
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } })
  }
  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }

  // 5 - 9
  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS })
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}

/* coming after setting up the filters in FIlter_reducer. */

/* 1: let's start on initialState, and then let's just add four values. First one is gonna be the cart, which at the moment is gonna be empty array, but we'll flip it to the local storage. Then I would wanna go with total items. So that is just gonna showcase how many items we have in a cart total.
So not how many products. We might have three products, for example, but then if the amount for them is gonna be different, then of course we're counting the total items. then also we have total amount, So that is gonna be the total dollar amount. then there's gonna be some shipping fee and there's also gonna be a order total. So that's gonna be my total amount in the cart, plus the shipping fee. */

/* 2: set up the reducer in the cart Provider. let's add Value in the return and pass in my state. I also would want to set up my index. 'Cause remember, just because we are setting up the context, doesn't mean anything. Unless we wrap our application. And then of course we can access those values anywhere in our app.
So go on index.js to wrap the app in the CartProvider */

/* 3: set up fn addToCart. we invoke this function only in a single product. Since my API has that property of stock, since I'm checking how many items I have in stock, there's gonna be more functionality to this add to cart function. Again, normally I just grab the ID, I just find the product and I just add it to the cart. But since we always wanna double check with that stock, since this functionality is a little bit more complicated in this add to cart, we'll have to pass in more values.
I don't want the amount to be bigger than the amount of items I have in a stock. in the payload, that's where we'll pass in all of our values that are coming as parameters.
Go back on AddToCart.js, to get my function and pass these values down */

/* 4: remove item, toggle, and clear cart btn
Go on CartPage */

/* 5: now i want to set up the functionality where every time there's a change with our cart, I would wanna invoke the useEffect. And I would wanna save our current cart in the local storage. every time something changes, I'm just grabbing that latest value and then I'm overwriting the value in the local storage. in setItem we need to pass two things. the key name 'cart'. And then the value.
Now, remember, that we can only store strings over there and that's why we'll go with JSON and then stringify. remember that there's gonna be a case where user just navigates away from the page. So, when comes back, when we initialize the cart, I also would wanna check my local storage first. and at the moment, every time we'll make a change, we'll still start from scratch because our cart is just an empty array by default. */

/* 6: for those reasons, we need to create a function that checks whether we have the item in a local storage by the name of cart. If we do, then I would wanna set up my cart Equal to that. If not, it's still gonna be an empty array. Remember this is just a browser api, That's why we have such a free access to it.
So I'm setting up my cart equal to local storage, get item and then cart. And I'm just checking for the value. If there's something there, then, I would wanna return whatever I have in local storage and set it equal to the cart. If not, it's just gonna be empty array. remember to parse it since we stored it as a string but now we're gonna parse it back. And in the initialState, update the cart; from [] to getLocalStorage()
So now, once we actually add the item, even when we refresh the page, we should see the cart content. Because we're persisting our data between the renders.
GO on CartContent.js to set up the return */

/* 7: coming from CartItem.js. remove item fn. Remove item was looking for the ID, And then clear cart is just gonna dispatch the action by itself without any kind of parameters. the same is gonna be in remove item but we'll have to paste in as a payload our ID. So we're looking for two actions, remove cart item and then clear the cart.
Go on CartReducer; Next step is to set up the cartReducer to handle the actions */

/* 8: toggle the - and + btn, toggle amount. I'm taking the id and the value. since I would want to add the same function to both buttons, that's why I'll pass in whether I'm increasing or decreasing. so value is decrease or increase. dispatch the actions. payload here is an object
Go on CartItem to set this up.
and then now let's toggle them (payload: {id, ->value}). i can log inc and dec based on the btn i click (remove the dispatch first to see it). Please understand that in this case I am already iterating over the cart, so I'm getting that cart id, which is just a combination of product id plus the color. In this case, I already have the id since I'm iterating over the array. */
/* Go back on cart_reducer to toggle them */

/* 9: let's set up the amount of items for the cart, after the CartButtons.js. And I'll dispatch an action by the name of count cart totals. So every time we'll change something in the cart it's gonna be displayed in multiple places.
Let's handle it in the cart_reducer or we get error */
