import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({ product }) => {
  // 5
  const { addToCart } = useCartContext()

  // 1
  const { id, stock, colors } = product
  /* console.log(colors) */
  const [mainColor, setMainColor] = useState(colors[0])

  // 3
  const [amount, setAmount] = useState(1)

  // 4
  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1
      if (tempAmount > stock) {
        tempAmount = stock
      }
      return tempAmount
    })
  }
  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1
      if (tempAmount < 1) {
        tempAmount = 1
      }
      return tempAmount
    })
  }

  return (
    <Wrapper>
      {/* 2 */}
      <div className='colors'>
        <span>
          colors :
          <div>
            {colors.map((color, index) => {
              return (
                <button
                  key={index}
                  className={`${
                    mainColor === color ? 'color-btn active' : 'color-btn'
                  }`}
                  style={{ background: color }}
                  onClick={() => setMainColor(color)}
                >
                  {mainColor === color ? <FaCheck /> : null}
                </button>
              )
            })}
          </div>
        </span>
      </div>

      {/* 3 - 5 */}
      <div className='btn-container'>
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <Link
          to='/cart'
          className='btn'
          onClick={() => addToCart(id, mainColor, amount, product)}
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart

/* i'm coming from SingleProductPage */

/* 1: destructure three things out of the product: id, stock and colors. Pass in the product in the function.
there's going to be two state values, one for the amount and one for the colors. First color will be displayed by default */

/* 2: as regard the colors, iterate over and once i click on the color, state value = that color. the background of the colors will be dinamic because it will be the color of the array */
/* Now, of course, once I click on a button, I would want to change my state value for two reasons. change the main color first, because this is going to be the value that I pass into the cart (whichever color I pick is also going to be displayed in my cart.)
And then the second thing, depending on this value, whatever it is, the main color value, I would also want to change the opacity  */
/* I would want to display the check icon inside of the button. So that just signals which item I have selected. And then the second one, I would want to add dynamically that class of active. Look at className and the btn content */

/* 3: function to increase and decrease the items in the cart and add to cart. there's going to be two functions. one for increase and one for decrease. Now, since I'm going to be passing them down into amount buttons component, I'm just going to set up placeholders. */
/* Eventually, once we click on a link, we will invoke the cart function. 
Go on AmountBUttons component, we have to check the stock, if the amount is higher than 0. */

/* 4: increase function. (oldAmount) is the value before the update.  whatever we are returning from this function is going to be that new value. I would want to check if the temp amount is bigger than stock; if it is bigger than stock value, = to stock.
decrease fn.
So i can get the amount to the max number of items in the stock and then the minimum will be 1 */

/* now we have to work on the page with all the products.setting this up on a separate context responsible for filtering, sorting and changing the view of the items. 
Go on FilterContext */

/* 5: coming from cart_context. remember useCartContext. Grab my addToCart fn. and once we click on the button, add to cart. I would wanna pass in those values. I do wanna set up the arrow function because we'll have to pass in the arguments. we already have destructured from the product (see n.1).
lastly, since I always would want to double check with my stock values, I also need to pass in the product.
Go on cart_reducer.js and handle the action */
