import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

// 1
const Product = ({ image, name, price, id }) => {
  return (
    <Wrapper>
      <div className='container'>
        <img src={image} alt={name} />
        <Link to={`/products/${id}`} className='link'>
          <FaSearch></FaSearch>
        </Link>
      </div>
      <footer>
        <h5>{name}</h5>
        {/* 2 */}
        {/* <p>€{price}</p> */}
        <p>{formatPrice(price)}</p>
      </footer>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  .container {
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
  }
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }
`
export default Product

/* 1: since I'm passing in all the properties, I just need to be specific which ones I'm looking for.
Remember that single product is a placeholder page where there's going to be a user effect and we'll pass in that specific ID in the user effect. And then of course we'll fetch that single product.
Link is going to navigate again dynamically to product.ID. Because, go in App.js, the path for the single product is /products/:id , my url parameter
go back on featuredproducts.js */

/* when we talk about payment processors, they will be looking for the smallest unit of currency. So we'll have to convert it, And in that card, we have a bunch of calculations.
about JavaScript. When we talk about decimals, once in a while we get some weird bugs. when you talk about money, you want to set up your prices in that smallest unit because the payment processor is going to be looking for that, to avoid bugs. the downside of that is that everywhere where you want to display, you will have to do a little bit of work.
We know that $1 is 100 cents. And what we simply can do is just divide by 100. now my price is in cents and I just simply divide my price by 100 and I'll get the dollar value. in JavaScript there is a built in method, and the method name is international number format. Look at imports, formatPrice */

/* 2: remove dollar sign and pass the price in the formatPrice. So I'll set up a function that we'll use all throughout our project, every time we want to display the price
go tu utils, helpers.js to set up there the functionality */
