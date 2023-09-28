import React from 'react'
import { useFilterContext } from '../context/filter_context'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import styled from 'styled-components'
const Sort = () => {
  // 1 - 6 - 7
  const {
    filtered_products: products,
    grid_view,
    setGridView,
    setListView,
    sort,
    updateSort,
  } = useFilterContext()

  return (
    <Wrapper>
      {/* 2 - 6 */}
      <div className='btn-container'>
        <button
          type='button'
          className={`${grid_view ? 'active' : null}`}
          onClick={setGridView}
        >
          <BsFillGridFill></BsFillGridFill>
        </button>
        <button
          type='button'
          className={`${!grid_view ? 'active' : null}`}
          onClick={setListView}
        >
          <BsList></BsList>
        </button>
      </div>

      {/* 3 */}
      <p>{products.length} products found</p>
      <hr />

      {/* 4 */}
      <form>
        <label htmlFor='sort'>sort by </label>

        {/* 7 */}
        <select
          name='sort'
          id='sort'
          className='sort-input'
          value={sort}
          onChange={updateSort}
        >
          <option value='price-lowest'>price (lowest)</option>
          <option value='price-highest'>price (highest)</option>
          <option value='name-a'>name (a-z)</option>
          <option value='name-z'>name (z-a)</option>
        </select>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`

export default Sort

/* we'll place 2 buttons to control the view and the paragraph to show how many products we have (checking for the length of the filtered products array.) and sort - select input to sort by price, ecc... */
/* 1: we need access to the FilterContext. What values i'm looking for? Filtered products and grid view (I would want to check what is the current status of the grid view. Is it false or is it true?). */

/* 2: the buttons will have onClick, to change the view of the property in our context, but let's start with the active class: if grid view is true, then add the active class. If not well then just add null. The second button is different because i want to add the active class if the first one is false.
Now one btn is black and the other one is white. the black one will be the selected one. But we need to add other functions */

/* 3: Right after the div container, I would want to set up my products, so display how many products I have currently in my filter products. Of course, as will be filtering this value will change. */

/* 4: set up the select. important the name value. Eventually, there's going to be a value and on change. Not a controlled input for now. set up the options for sort. attention to values. nothing is going to happen, we just display the select input with the options */

/* 5: functionality to change the list. go on filter_context */

/* 6: grab the functions of setGridView and setListView from filter_context and work on buttons with onClick. now we need to handle this in the reducer, so go on filter_reducer  */

/* 7: access the FilterContext updateSort and Sort. then add Value in the select, this is the value that is coming from the state, which in my case is going to be price-lowest, so it's = to sort because in the const initialState from filter_context, sort: 'price-lowest'; and then add onChange fn.
Now in the console we can see the value of which option we choose from Sort, we get sort and the value selected, so name and value. (I have commented 'const name = e.target.name' in filter_context because I don't need it now with this, but it will be important for the filters. In this case we Sort, i only need the value) */

/* now, of course, every time I do something with my select I would want to update my state. I would want to change this value, the short one. we need to dispatch an action.
Go on filter_context */
