import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  // 1
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload
    const tempItem = state.cart.find((i) => i.id === id + color)
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      })
      return { ...state, cart: tempCart }
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }
  // 2
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload)
    return { ...state, cart: tempCart }
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }

  // 3
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === 'inc') {
          let newAmount = item.amount + 1
          if (newAmount > item.max) {
            newAmount = item.max
          }
          return { ...item, amount: newAmount }
        }
        if (value === 'dec') {
          let newAmount = item.amount - 1
          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...item, amount: newAmount }
        }
      } /*  else {
        return item
      } */
      return item /* instead of else */
    })

    return { ...state, cart: tempCart }
  }

  // 4
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem
        total.total_items += amount
        total.total_amount += price * amount
        return total
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    )
    return { ...state, total_items, total_amount }
  }

  /* return state */
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer

/* 1: let's handle add_to_cart action. let's get the values from payload. remember to remove -return state- as we did in filter_reducer or it gives error.
I would wanna start my functionality by checking whether the item is already in the cart. at the moment it's an empty array. when I'm gonna be setting up the ID in a cart, I will combine my color with my ID. So of course, I already have the ID as far as the product ID. but then since in a cart, I have the same product but maybe with a different color, I will combine them. We need here find method (i = item)
and I'll say if item ID matches to that of ID plus color, that is coming from my payload, that means that the item is already in the cart. If it's not, then of course, we're adding a brand new item, and I'll set up my if/else.

as far as the ELSE return, in the state I would wanna override the cart, and as far as the cart, I'm just gonna looking for the state cart values, so I would wanna copy all the values from my previous cart, which, at the moment, of course, is just an empty array, and then I would want to add that new item, that new object that we're constructing over here.
And as far as the ID, remember, I just said that we'll construct our ID by combining ID plus color, 'cause I can have the same item, so the same product, but with different color.
I also want to have a property of max, which is gonna be equal to my stock. because I don't want the user to pick more items than I have actually in stock. Now i can have the item with a color in the cart (web components) but if i try to add same item and same color i have error because we have temp item, and we're not handling that return.

IF the item is already in the cart: mapping over the cart, checking the id matches, and then we'll set up a bit more functionality.
as far as the return, as I'm mapping over, I have two cases. I have a case where, of course, the id is gonna match to whatever I'm grabbing from the single product. Just keep in mind though that we need to check for both of them. We need to check for the id plus color, because that is the cart item id. I am using the id in product, but in the cart, the id is actually id plus color. And if that is the case, then of course, I'll have to change the amount.
So if the item is already in the cart and i'm adding the same one with same color again, I just want to increase that amount. if it's not, i add a new item in the cart. and about stock, if the value is bigger than the max, then the amount will be equal to the max.

Now go on cart_context to display add, remove item and clear cart */

/* 2: handle clear_cart and remove_cart_item actions.
I would wanna check for remove item. we're gonna go with action type, And if it is equal to remove cart item, then I would wanna filter my cart. And if the ID doesn't match to whatever I'm pasting in, then of course I'll leave that item in a cart. If it does match, then I'll remove it from my cart.
And then we just filter our state cart. And then we of course run filter and then every item, I'll name it as an item. And I'll say, if the item ID, if the cart ID doesn't match to whatever I'm pasting in, then I will return it. Why? Well, because I know that that is not the item that I clicked on. So I'll say if it doesn't match, the action, that payload, since that's where the ID is sitting, then I'm gonna return it. And as far as the return from the function I'm just gonna say dot, dot, dot state. So we want to get all my state properties and then cart will be equal to my temp cart.
So now i can remove the items and if i don't have any item, i have 'your cart is empty', Because in the cart page we handle that. We say if the cart is empty then this is what we're returning. And in local storage the cart is empty too */

/* clear_Cart is easier because the only thing we need to do is just return cart as a empty array. So if action and then that type, is equal to clear cart action then we just say return dot, dot, dot state and then cart will be our empty array. */

/* now let's toggle the amount of items in the cart for a single product, so the two buttons - and +; we use them in AddToCart.
Go on Cart_context */

/* 3: now we could set up our toggle functionality. I would want to get both of those values. So const id and value coming from action and payload. So let's grab those ones first. And similarly to how we were increasing the amount, when we added item to the cart we will iterate over the cart. And then we'll check first what is the value. So if we want to increase, then of course we'll add one to the amount. If not, then we'll decrease.
the steps are following where first I want to check if the item id matches id, but please keep in mind that in this case id is already that value. id is already id + color. So I just say, if the id is equal to id, then of course I'll toggle those values. If not, then I just simply wanna return the item. That's why we set up else and we say return the item as it is. My item as I'm iterating over.
However, if this matches, then of course there's two options. I either have value increase or decrease. both of them will return this item; it's just the amount that is going to change. And we'll set up our new amount. And then I need to check that amount so it is not bigger than the max, because we have the stock values */

/* now we have to count the totals. we'll set up a useEffect, So every time the state value will change we will invoke that function, more precisely, We will dispatch an action to count totals ,and we already have the useEffect because if we take a look at the CartContext, we were setting up our cart every time the cart changed in local storage.
before I set this up, I also would want to add the amount, so the state value to my Cart buttons */

/* so GO on CartButtons.js */

/* 4: let's handle the action COUNT_CART_TOTALS. we're just gonna iterate over the array. In this case we'll do that using our reduce. And then we'll just count for every item, what is the price, and what is the amount of items we have in the cart. I know that I'm gonna be returning a object from my reduce so I'll right away destructure it. 
in the reduce we pass in the callback function and in the callback function we have two params. We have total, That represents whatever we are returning from reduce. And also we have cartItem. As far as the return, I would wanna return a object and in that object there's gonna be two properties. Now I'll name them exactly like I have in CartContext, since I can just use my ES6 thing where if the name is exactly the same then I can just keep on using the same name.
total and then items, by default is gonna be zero, don't worry. Functionality is coming up, and the same goes for total. Total and _amount which also by default will be zero. So once I know that I'm returning object with these two values, of course I can just structure it here as well.
And then even though we haven't set up the functionality yet I know that I'll return my state dot, dot, dot, and then state. And then I would wanna change two properties the total items and total amount.
and now we just need to set up the functionality. Now one gotcha with the reducer, we always need to return our total. And please keep in mind that in each iteration I'm accessing the CartItem. Now what kind of properties I have in the Cart item? I have the amount and the price, So I can just destructure that. price and amount are coming from my cartItem. in each iteration I just want to grab the amount value and add it to that total items.
And then when it comes to the total amount, so that is gonna be the price multiplied by amount, again, the same exact setup where we go with total, and then total amount. So that's gonna be the total money amount. And in this case I'll say plus equals, and I just need to multiply price by the amount since of course in order to get my total I need to know how many items of this particular product I have multiplied by the product price. And that will be added to my total amount.
since we already are setting up everything in local storage as well, that's why I'm getting my items. And I can make my calculation */
/* now i can see total items and total price */

/* let's set up authentication in our app. Basically, we wanna provide login and logout functionality as well as access to certain resources only to authenticated users. To make the entire auth setup as fast and smooth as possible, we will use auth0 Platform which is a cloud-based identity as a service platform that provides authentication and authorization services for applications. */
/* GO on Index.js to set auth in */
