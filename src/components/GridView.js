import React from 'react'
import styled from 'styled-components'
import Product from './Product'

// 1
const GridView = ({ products }) => {
  return (
    <Wrapper>
      <div className='products-container'>
        {products.map((product) => {
          return <Product key={product.id} {...product}></Product>
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`

export default GridView

/* 1: grab the products prop and return. iterate over the products and display the same product that we returned in a home page. This only for the grid setup, list one is different.
If you hover on the pictures there will be the icon and opacity change */

/* the layout will change dinamically. I would just want a hard code now, In the state. In a filter context, I'll set up some kind of property and initial value will be false. So the grid view will be false. And that's why we will display the list view.
And then eventually, working on sort, we'll add functionality where the user can control which view are we displaying */

/* go back on filter_context */
