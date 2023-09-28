import React from 'react'
import { useProductsContext } from '../context/products_context'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Error from './Error'
import Loading from './Loading'
import Product from './Product'

const FeaturedProducts = () => {
  // 1
  const {
    products_loading: loading,
    products_error: error,
    featured_products: featured,
  } = useProductsContext()

  // 2
  if (loading) {
    return <Loading></Loading>
  }
  if (error) {
    return <Error></Error>
  }
  // 3
  return (
    <Wrapper className='section'>
      <div className='title'>
        <h2>featured products</h2>
        <div className='underline'></div>
      </div>
      <div className='section-center featured'>
        {/* 3 -> 4 */}
        {featured.slice(0, 3).map((product) => {
          return <Product key={product.id} {...product}></Product>
        })}
      </div>
      <Link to='/products' className='btn'>
        all products
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturedProducts

/* we need the hook useProductsContext, check for loading since I would want to show the spinner. Then I also would want to showcase if there's some kind of error. And eventually, I would want to showcase the featured product since we're just going to iterate over them and then display each item. */

/* 1: pulling down the object and then from the object I'm looking for products, loading and error. we give them alias. these come from useProductsContext */

/* 2: if conditions to display error or the items. */

/* 3: let's iterate over them (over the products array). And for every product we're going to return a product component. we need to pass in the key and in the object we have the ID property and then we'll use the spread operator {...product}
go on product.js component */

/* 4: we have the array method by the name of slicer. So essentially you get items from the array and then creates a new one. instead of iterating over the whole thing. I'll pass in well how many items I would want and then I'll chain my map. (0, 3) will grab items with the index of 0, 1, 2, not 3
Go on products.js */

/* let's also display a link that navigate back to productPage */
