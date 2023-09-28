import React, { useState } from 'react'
import styled from 'styled-components'

// 1 - 2
const ProductImages = ({ images = [{ url: '' }] }) => {
  const [main, setMain] = useState(images[0])
  /* console.log(main) */

  // 2
  return (
    <Wrapper>
      <img src={main.url} alt='main' className='main' />
      <div className='gallery'>
        {/* 3 - 4 */}
        {images.map((image, index) => {
          return (
            <img
              src={image.url}
              alt={image.filename}
              key={index}
              onClick={() => setMain(images[index])}
              /* 5 */
              className={`${image.url === main.url ? 'active' : null}`}
            />
          )
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages

/* come from singleProductPage. There should be some kind of use state variable that has that main image and we can use the index. We can say, yeah, first I would want to display the first image and then as I'm clicking, of course I'll change that state index and as I'm changing that index, of course the value in the main one will also change. */

/* 1: get the imgages and useState variable to set up the main img = first img of the array. but initially the img is undefined. use ES6 default parms: if the images is undefined, then it's just going to be an empty array. */

/* 2: we need the url of the img. now not only I'm getting the first item, but then from that first item, I'm looking for the URL. So now we need to update that default value.
if The image is undefined Then there's going to be an array with an empty object and I'll just set that URL to be empty string. */

/* 3: display the gallery (other images). I'll need the index too because that's how i can control the state value. because each image has the index And by default, I'm showing the first one. once i click on one of them, i change the state value */

/* 4: once i click an img, it become the new main one -> onClick */

/* 5: check whether the image URL matches the URL that is coming from the main. If that is the case, then I know that of course this is the image that I'm displaying. 
then every time I click, I change that main URL. And as I'm changing that value, well, I'm also getting that a nice border all around. */

/* go back on SingleProductPage.js */
