import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'

const CartTotals = () => {
  const { total_amount, shipping_fee } = useCartContext()
  const { myUser, loginWithRedirect } = useUserContext()
  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal : <span>{formatPrice(total_amount)}</span>
          </h5>
          <p>
            shipping fee : <span>{formatPrice(shipping_fee)}</span>
          </p>
          <hr />
          <h4>
            order total :{' '}
            <span>{formatPrice(total_amount + shipping_fee)}</span>
          </h4>
        </article>
        {myUser ? (
          <Link to='/checkout' className='btn'>
            proceed to checkout
          </Link>
        ) : (
          <button type='button' onClick={loginWithRedirect} className='btn'>
            login
          </button>
        )}
        {/* <Link to='/checkout' className='btn'>
          proceed to checkout
        </Link> */}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`

export default CartTotals

/* we have useCartContext because I would want to grab the total amount and the shipping fee from my context. And remember, since we passed in the whole state we should have access to that. Then there's also gonna be a user context and format price */
/* there's also link component, this is gonna direct us to the login if we haven't logged in or we have option to go through the checkout if, of course we have already logged in. */
/* to pass in the total amount inside formatPrice() we need to get it from useCartContext first, and the same for the shipping fee. And for total, we just sum up these two */
/* Go on CartItem.js */
/* add checkout link to page if user is logged in and get loginwithredirect to set up if statements where if we don't have the user, redirect to login option */
/* this is the btn on the cart component when i want to do the checkout */
/* one more feature that I would like to add to our app is restricting the access of the checkout page if we haven't logged in, because i can access to the checkout page also if i'm not logged in by adding /checkout to the url.

we need to set up a private route where, again, we're going to check whether the user has logged in, and then if he or she has logged in, then, of course, we'll display the page. If not, then we will redirect back to the homepage. we can set it up with auth0
GO on Index.js to import PrivateRoute and export it, and go in App.js */
