import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

const Stars = ({ stars, reviews }) => {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5
    return (
      <span key={index}>
        {stars > number ? (
          <BsStarFill />
        ) : stars > index ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    )
  })
  return (
    <Wrapper>
      <div className='stars'>{tempStars}</div>
      <p className='reviews'>({reviews} customer reviews)</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars

/* I'm looking for my stars proper as well as the reviews prop. */

/* 1: set up stars, initially manually and then reviews. */

/* 2 : span= what is the value of the stars? 
Manually approach -> this is going to be the case where we'll have to copy and paste this five times = 5 stars
And for every value from 1 to 5, I would want to check what is the actual value in the stars? And then depending on that, I'll display the full one, the half one or the empty one.
Attention to () and the values

return (
    <Wrapper>
      <div className='stars'>
        <span>
          {stars >= 1 ? (
            <BsStarFill />
          ) : stars > 0.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {stars >= 2 ? (
            <BsStarFill />
          ) : stars > 1.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {stars >= 3 ? (
            <BsStarFill />
          ) : stars > 2.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {stars >= 4 ? (
            <BsStarFill />
          ) : stars > 3.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span>
          {stars === 5 ? (
            <BsStarFill />
          ) : stars > 4.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
      </div>
      <p className='reviews'>({reviews} customer reviews)</p>
    </Wrapper>
  ) */

/* First iteration is 3.5 >= index (0) + 1,  so is 3.5 >= 1 - yes, so we display <BsStarFill />
Second iteration is 3.5 >= index (1) + 1,  so is 3.5 >= 2 - yes so we display <BsStarFill />
Third iteration is 3.5 >= index (2) + 1,  so is 3.5 >= 3 - yes so we display <BsStarFill />
Forth iteration is 3.5 >= index (3) + 1,  so is 3.5 >= 4 - no, ok now we go to second check. Is 3.5 >= number (in this case 3.5, since the index is 3),yes so we display <BsStarHalf />
Forth iteration is 3.5 >= index (4) + 1,  so is 3.5 >= 5 - no, ok now we go to second check. Is 3.5 >= number (in this case 4.5, since the index is 4),no so we display <BsStar /> */

/* Array approach -> programmatical approach. cut out the spans and insert values dinamically with variables to use.
create a new array with the Array.from method. Now since I know that I'm going to have five stars, I can right away pass in the object and the object is going to have the length property of five.
we know that the second argument in array.from is the callback function that we can call against every item. I don't care about the actual item, which is the first parameter. So that's why I'll pass in the underscore because it's going to be undefined.
What I'm interested in is the index, because again, I'll use that index and then for every item that I have, I'll return either a full star and a half star or a empty star. Set up a new variable is going to be fourth half star where I'm going to go with constant number and that will be equal to index plus 0.5.
every time index will be changing, so of course this value will be also changing. First case is going to be 0.5. Next 1.5 and on and on and on.
And then, second thing, what do i want to return from this callback function. Of course, my span. The logic is following. So we'll say if stars is bigger or equal to index plus one, why? Well, because initially index is zero. And then when it comes to this 0.5 value, well, I'll just change it to a number And I would want to start with one I would want to go from 1 to 5.
and then render the tempStars */

/* now we want to complete my single product by setting up the add to cart component. it is simply some kind of function that is in the cart context or in global context that just does the functionality where we just add a product to a cart. in this case, we have a separate component and then there's going to be even more components because we have more functionalities (color, amount).
Go on SingleProductPage */
