import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {
  /* console.log(useParams()) */
  /* console.log(product) */
  // 1 - 4
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext()

  // 2
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`)
    // eslint-disable-next-line
  }, [id])

  // 4
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
    // eslint-disable-next-line
  }, [error])

  // 3
  if (loading) {
    return <Loading></Loading>
  }
  if (error) {
    return <Error></Error>
  }
  /* console.log(product) */

  // 5
  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = product

  return (
    <Wrapper>
      {/* 6 */}
      <PageHero title={name} product />
      <div className='section section-center page'>
        <Link to='/products' className='btn'>
          back to products
        </Link>
        <div className='product-center'>
          {/* 8 */}
          <ProductImages images={images}></ProductImages>
          <section className='content'>
            <h2>{name}</h2>
            {/* 9 */}
            <Stars stars={stars} reviews={reviews}></Stars>
            <h5 className='price'>{formatPrice(price)}</h5>
            <p className='desc'>{description}</p>
            <p className='info'>
              <span>Available : </span>
              {stock > 0 ? 'In stock' : 'out of stock'}
            </p>
            <p className='info'>
              <span>SKU : </span>
              {sku}
            </p>
            <p className='info'>
              <span>Brand : </span>
              {company}
            </p>
            <hr></hr>
            {/* 10 */}
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage

/* The single product page is somewhat big and complicated, so I would want to set up separate components for these images. I would want to set up a separate component for the stars (reviews) as well as the colors and add cart functionality. So this is going to be the case where I would really want to split it up in multiple components.
We have 3 links, home, products (all the list) and that one of the single product */

/* 1: let's get the id of the products. With react router dom, in order to access the url parameters, we need a hook: useParams. i'll attach the id to the url, so i can fetch the product. Now I do need to destructure it. That's why I'll close it in the curly brushes. So now what I'm saying is get me the ID property out of this object, the one that we can see in console.
Let's get the loading error and the product. initially it's an empty object and then the function will fetch single product. all the things we take and go to destructre are coming from my hook, so invoke it. */

/* 2: set up useEffect first. when i load this page i want to invoke useEffect and fetch singleProduct. i need to pass the url + id to access the product. we would want to invoke it when the component mounts. So that's why I will just pass an empty dependency array.
if you want, we can add ID in the dependency array. So as the ID changes, then we would just fetch that new product. That's also an option. In the {} And then two things that I would want to pass in. I'll pass in the URL that is coming from my constant And the second thing is the Id. */

/* 3: check for loading and error */

/* 4: another useEffect to manage the error. setTimeout = it will be displayed in tot time; useHistory / useNavigate hook: to programmatically navigate away from the page. the method of useHistory is Push but with useNavigate it's not needed to write .push or it gives error
Attention: useHistory was removed in react-router v. 6 -> useNavigate take it's place
Remember that by default, this error will be false so it's not going to reload. we would need to add that error in dependency array because when we start fetching error is false, but then once we're done loading and then once we can see that there's an error, then of course we set up an error to be true. Put it in the dependency array
we can create the same functionality with redirect */

/* 5: we still have to pull out most of the props of the product. destructure the props that we'll use in this return. I want to conditionally also show the product so that link to the product page. it's going to be conditional because in the actual product page, I'm not going to do that. However, in a single product, I would want to do that.
Go on PageHero component and check for one more prop, product. */

/* 6: now I need to say that in the single product page I'll pass in that prop (product). That's why I will have the home and the product and then whatever is the product name that should do it. set up also the link, img, ecc... */

/* about stock: for the available, I would want to check whether the length of the stock is bigger than zero, because remember when it was coming from the API, we had some kind of number. So if the value is zero, then of course I know that there are no more items in stock, so it doesn't make sense to keep on adding to the cart. */

/* I would want to go with add to cart component because when it comes to adding to the cart, there's going to be multiple colors available. So that's why I wouldn't want to set this up in the actual single product.
There's going to be a separate component that sets up how many items we're going to add to the cart as well as the color. And since there's going to be some logic involved, I don't want to set this up in a single product. I only want to display that component if the in-stock value is bigger than zero. */

/* 7: so set up another function to check for the stock */

/* 8: about the img, i want a big one that's the main img, and a buch of images that we can click on to make it become the main one. so they come from ProductImages component. go on that component */

/* 9: stars. and go on stars.js */

/* 10: display add to cart component if the stocks are > 0. pass the product value. So I'm not going to pass property by property, I'm just going to grab the whole thing so all the properties and pass it in as a prop.
Go on AddToCart component */
