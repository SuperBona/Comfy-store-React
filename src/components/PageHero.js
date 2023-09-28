import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const PageHero = ({ title, product }) => {
  return (
    <Wrapper>
      <div className='section-center'>
        <h3>
          <Link to='/'>Home</Link>
          {product && <Link to='/products'>Products</Link>}/ {title}
        </h3>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 20vh;
  display: flex;
  align-items: center;

  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`

export default PageHero

/* insert link to home and I would want to display that title, which is going to change as we navigate from page to page. do the same with checkot page in pages */

/* add product prop (related to singleProductPage). if the product prop is true, then I would also want to return one more link, which is going to be to the product page.
so, conditionally, If we are in the single product, then of course we'll display the product link as well. And if I'm checking for the product prop, in a single product, I just need to pass it in. so, go back on SingleProductPage */
