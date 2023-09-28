import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  /* 1 */
  const {
    filters: {
      text,
      category,
      company,
      color,
      min_price,
      price,
      max_price,
      shipping,
    },
    updateFilters,
    clearFilters,
    all_products,
  } = useFilterContext()

  // 3
  const categories = getUniqueValues(all_products, 'category')
  const companies = getUniqueValues(all_products, 'company')
  const colors = getUniqueValues(all_products, 'colors')
  /* console.log(categories) */
  /* console.log(colors) */

  return (
    <Wrapper>
      <div className='content'>
        {/* 2 */}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='form-control'>
            <input
              type='text'
              name='text'
              placeholder='search'
              className='search-input'
              value={text}
              onChange={updateFilters}
            />
          </div>

          {/* 4 */}
          <div className='form-control'>
            <h5>category</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    onClick={updateFilters}
                    name='category'
                    type='button'
                    className={`${
                      category === c.toLowerCase() ? 'active' : null
                    }`}
                  >
                    {c}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 5 */}
          <div className='form-control'>
            <h5>company</h5>
            <select
              name='company'
              value={company}
              onChange={updateFilters}
              className='company'
            >
              {companies.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                )
              })}
            </select>
          </div>

          {/* 6 */}
          <div className='form-control'>
            <h5>colors</h5>
            <div className='colors'>
              {colors.map((c, index) => {
                if (c === 'all') {
                  return (
                    <button
                      key={index}
                      name='color'
                      onClick={updateFilters}
                      data-color='all'
                      className={`${
                        color === 'all' ? 'all-btn active' : 'all-btn'
                      }`}
                    >
                      all
                    </button>
                  )
                }
                return (
                  <button
                    key={index}
                    name='color'
                    style={{ background: c }}
                    className={`${
                      color === c ? 'color-btn active' : 'color-btn'
                    }`}
                    data-color={c}
                    onClick={updateFilters}
                  >
                    {color === c ? <FaCheck></FaCheck> : null}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 7 */}
          <div className='form-control'>
            <h5>price</h5>
            <p className='price'>{formatPrice(price)}</p>
            <input
              type='range'
              name='price'
              onChange={updateFilters}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>

          {/* 8 */}
          <div className='form-control shipping'>
            <label htmlFor='shipping'> free shipping</label>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              onChange={updateFilters}
              checked={shipping}
            />
          </div>
        </form>

        {/* 9 */}
        <button type='button' className='clear-btn' onClick={clearFilters}>
          clear filters
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters

/* coming from filter_context.js */

/* 1: I'll start by grabbing my context and now i want to destructure all of those things out of the state. So remember we have filters object and then I would want to get all those default ones. Plus I would want to get both of the methods and all the products as well. And you'll see why we actually need all the products. */

/* 2: since it's going to be a form, I also have this default action where once we press on enter, we refresh the page and I would want to avoid that. That's what I'll say onSubmit over here and we'll just set up our function. So once we submit the form, I would want to prevent the default. 
In input, name needs to have the same exact value like the one we have in the state. The search input is not a controlled input, but in order to set this up as controlled input, we need a value, So the value attribute with our default value coming from the state, and we need onChange. So once something changes, then I would want to run my updateFilters. */

/* go back on filter_context to add functionalities in the updateFIlters. because at the moment I can type some values in the search form but nothing is happenings because I get my value from the state that is set to be empty string. */

/* 3: here we have imported the fn getUniqueValues. i want to set it up. So since there's going to be three values I would want to set up that function to be accepting two parameters. One is going to be the data that is coming in, which is going to be my array. And then the second thing is going to be which item are we actually looking for.
each product has the property of category and of course it has some kind of value, so we have 'category' for that reason.
For comapny, Each object has the property of company that's well passed in the string value of the company. Same for colors
if i log i'll have undefined because we don't have the fn in the helpers.js.
Go on helpers.js */

/* 4: display all the categories with buttons, iterate over. the filters have different values to see the unique values. let's add the active class and run the updateFIlters at every selected category.
I do want to pass in the name though, and if for the input the name was text, Now for every button it needs to match to category, because this is the value that will change from the filters component. And then since in my state, default value is all, that's why the all button gets the active class. */

/* go on filter_context */

/* 5: companies, similar to sort, because we use <select> and iterate over and then display the options dinamically. since it's a controlled input we need value, equal to state value and remember onChange. in the Map, c = company, the item. the return will have different options */

/* about colors: we're not going to use text content in order to access that data. We'll use dataset property. for the data there's going to be data-color. So on the HTML element, we can have the attribute. So the name needs to start with data- and then whatever you would want. And then for the background color, the same like we did in the single product. We'll also just add this style background color. Now in order to access this will have to use that data set. */

/* 6: iterate over colors. iterate over colors and display the button. eventually there's going to be a condition that checks for the color of all, but not now. I have to check the main color so i need checkbox. in the button i need the name since I'll use that later in my update filters function. And this one needs to match the state value.
as default color we have black color and then dynamically we'll add the colors using inline CSS, Since I know that color is an array with hex values. just like in single product, I'm going to go with style attribute and we'll dynamically add the background property. Then I also would want to add a class name if the button is actually active. So if it matches my state value.
I would want to add the hex value to the data because I would want to somehow pass from the button to my filter context. then display the icon of check if we click on the color
but now, if i click on a color, the fn doesn't work anymore because we're not setting up the value correctly, and we can clearly see it if we navigate to the state. components, filter provider, filters. colors = all, if i press one of them it's going to be empty string. in order to get this data colo, we'll have to navigate back to the filter context and set up one more if statement. */

/* go on filter_context */

/* I would want also to display the button that says 'all' instead of the circle with gray color at the beginning. inside of the filters when we're iterating over, if the value for the color will be all, then there's going to be a different return.
once you click on a button, you notice that we're getting the unique value. */

/* 7: prices. let's display the max price, but we need to run the formatted price, remember. we need also 3 attributes, min and max price and the actual value. when i'm getting the value from this input, it will be a number, but when changing the value it become a string.
and it can be a problem when filtering products.it's a controlled input. 
go on filter_context to fix it.  */

/* 8: shipping. i want also to display by default whetever i have in the state. So once I click on it I would want to invoke onChange, and we're gonna go with update filters, but also I would wanna display whether the state value is true or false. And in this case, we're not looking for the value.
We go with checked attribute and we'll set this equal to our shipping value. So if this value will be false, then the checkbox will be onClick. However, if the value will be true, and we will display that we have checked on the checkbox.
go on filter_context */

/* 9: clear filters function. go on filter_context */
