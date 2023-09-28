import React from 'react'
import styled from 'styled-components'
import { PageHero, StripeCheckout } from '../components'
// extra imports
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'

// 2
const CheckoutPage = () => {
  const { cart } = useCartContext()
  return (
    // 1
    <main>
      <PageHero title='checkout' />
      <Wrapper className='page'>
        {cart.length < 1 ? (
          <div className='empty'>
            <h2>Your cart is empty</h2>
            <Link to='/products' className='btn'>
              fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`

export default CheckoutPage

/* 1: same structure of PageHero.js. now let's work on the homepage */
/* 2: let's import StripeCheckout, useCartContext and Link, because if my cart is empty in the checkout, essentially I would wanna say, hey your cart is empty and you need to fill it, so we're gonna pretty much do the same thingthat we did in the cart */
/* 3: let's check if the cart is empty. if it is, display the link */
/* GO on CartButtons */
