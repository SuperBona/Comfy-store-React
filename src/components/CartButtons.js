import React from 'react'
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useProductsContext } from '../context/products_context'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'

const CartButtons = () => {
  // 2 - 3 - 4
  const { closeSidebar } = useProductsContext()
  const { total_items, clearCart } = useCartContext()
  const { loginWithRedirect, myUser, logout } = useUserContext()

  return (
    <Wrapper className='cart-btn-wrapper'>
      {/* 1 - 2 */}
      <Link to='/cart' className='cart-btn' onClick={closeSidebar}>
        Cart
        <span className='cart-container'>
          <FaShoppingCart></FaShoppingCart>

          {/* 3 */}
          <span className='cart-value'>{total_items}</span>
        </span>
      </Link>

      {/* 5 */}
      {myUser ? (
        <button
          type='button'
          className='auth-btn'
          onClick={() => {
            clearCart()
            logout({ returnTo: window.location.origin })
          }}
        >
          Logout <FaUserMinus />
        </button>
      ) : (
        <button type='button' className='auth-btn' onClick={loginWithRedirect}>
          Login <FaUserPlus />
        </button>
      )}

      {/* 1 - 4 -> moved in point 5 */}
      {/* <button type='button' className='auth-btn' onClick={loginWithRedirect}>
        Login <FaUserPlus /></button> */}
      {/* 4 */}
      {/* <button
          type='button'
          className='auth-btn'
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Logout <FaUserMinus />
        </button> */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`
export default CartButtons

/* this is the case where i set up a class on the Wrapper, because it will be used for the global classes. And the second use case: notice the navbar: once we get to the big screen, I would want to showcase the links as well as the card buttons.
But at the moment we don't see these card buttons. in Navbar.js CSS we have .cart-button-wrapper with display grid. So once we get to that 992px I would want to display them. And before that I hide them by default. So they're hidden the same as links.
And in order to do that, I had to add that class at the Wrapper over here. */

/* once i click on a sidebar link, i want to close the sidebar. i don't have the functionality yet */

/* 1: let's place the cart component, in which there is the total. this one will be dinamic and come from useCartContext, but not now. as far as the login button, there's going to be a ternary operator that check if we have logged in or not, but not now.
this one is going to have a onclick function. this is the initial setup */

/* let's go on footer.js and then on sidebar */

/* 2: set onclick functions for close and open */

/* And the last thing that is missing in our puzzle is of course the navbar, which has the button that controls whether we can see the sidebar. go on navabar.js */

/* 3: coming from cart_reducer point 3. here let's add the state value to the cart button, to display how many items we have in the cart. with this i'll have 0 as value, so go on cart_context */

/* 4: set up login and logout btn. I'm gonna go with const and we're looking for loginWithRedirect, That is my function of course. Then I would want to get myUser, which of course is gonna be null and then log out as well. And all of that is coming from useUserContext.
And then where I have the button for the login, I'll add the functionality actually to log in the auth0. And side by side, I'll set up a button as well for the logout. for the logout button there's a bit more functionality because we need to invoke it and we need to pass in some data.
in the logout we just need to pass in the redirect parameters. So we set up a object and the property we're looking for is a return to. And we go with window location and then origin. Again, this is exactly what they ask in the documentation, that's all.
Look on the console, we can see user:false, isAuth:false, isLoading:true. Try to click on the login, we can login. We can see the values changing on console. we are sure we logged in since user is an object and isAuth is true and isLoading false */
/* GO on user_context */

/* 5: if I'm logged in, then show me the logout link. If I'm logged out, then of course show me the login link. We can check it with myUser, that is false if not logged in, or an object if logged in */
/* And once we're able to log in and log out, now I would wanna restrict the access to checkout page based on those values. based on that value we'll either display or hide the link to a checkout page. I'm looking for 3 components: Navbar, Sidebar and CartTotals. start with Navbar */

/* 6: coming from checkoutPage; set up a different fn for the logout. let's import and use clearCart. so if i logout, cart items will be back at 0.
now of course we'll just work in two files, we'll work in StripeCheckout, where we'll set up our form and all that good stuff, and then we'll create another function in the functions, and we'll pass data back and forth to complete our transaction. */
/* SETUP the env file in the root, where we're going to keep the secrets (accept payments etc... they include api keys, they're secret). search for them in stripe overwiew Or you can just simply get them from the accept payment option, since they right away inject your keys. */
/* then change in the index.js of src the domain and client id importing them from the .env */
/* GO on StripeCheckout */
