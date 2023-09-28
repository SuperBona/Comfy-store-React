import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

// 1 - 6 - 8 - 12
const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  /* 3 */
  const { products } = useProductsContext()

  /* 2 */
  const [state, dispatch] = useReducer(reducer, initialState)

  /* 3 */
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])

  /* 11 - 15 */
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
    dispatch({ type: SORT_PRODUCTS })
  }, [products, state.sort, state.filters])

  /* 7 */
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }

  /* 9 */
  const updateSort = (e) => {
    /* const name = e.target.name !demonstration */
    const value = e.target.value
    /* console.log(name, value) */

    /* 10 */
    dispatch({ type: UPDATE_SORT, payload: value })
  }

  /* 13 - 14 */
  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value
    /* console.log(name, value) */

    /* 16 */
    if (name === 'category') {
      value = e.target.textContent
    }

    /* 17 */
    if (name === 'color') {
      value = e.target.dataset.color
    }

    /* 18 */
    if (name === 'price') {
      value = Number(value)
    }

    /* 19 */
    if (name === 'shipping') {
      value = e.target.checked
    }

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }

  /* 20 */
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  /* 5 - 7 - 9 - 13 */
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}

/* when it comes to filtering we need two things: all the products, but we also need this default value. So essentially, if I start filtering notice at some point, I would want to go back to all the products
two instances: we're going to have one instance in the product which we're going to filter. So change how big is the array? For example, if it matches the filters, then of course it's going to be returned. If not, then we'll dump it from that array. But there's always this default array that has all the products. So if we ever have to, we can go back to the default.
how we can get those products from the product context to the filter context? I would want to have a separate context for my products page. in product_context we use the hook useProductContext. When we had a hook, we could either invoke it in a react component or in another hook. Now, when it comes to filter reducer, it's neither, It's just a simple function.
So what we're going to have to do is set up a action that actually takes those products from the product context and dumps them into the filter context. There is the action in the actions.js -> load_products. We have our filter reducer where we'll set up all the filtering functionality and we also have the filter context. */

/* 1: I would just want to set up two state values. I have my initial state, I don't have a user reducer, but I would want to set up two properties. One is going to be for filtered products, so that's going to be the array that's always going to be changing as the user changes the values in the filters. And for the time being, it's going to have to be an empty array.
And the second one will be that all products one. So this is going to be the case where if I ever need to go back to the default, I will have this value as all products. */

/* 2: useReducer. remmember state, And of course, we're getting back to  dispatch. In useReducer we pass the reducer (in this case it's a filter reducer) and the initial state
Go on index.js and wrap the app in the filter provider, inside the ProductsProvider. So that just ensures that we'll always have access to the data that is coming from the products provider. */

/* 3: get the products from the ProductContext, were whe had all the products in the stateValue. grab them and pass them through the filterProvider. but I cannot just pass it into the state directly. What I would want is to set up my use effect. So when this component mounts, then I would want to dispatch an action which is going to be load products and the way is going to look like we're going to go with use effect.
And then of course we have our callback function. But the gotcha is that remember products initially is just going to be empty array. Even in the products context. And that's why as a dependency will pass in the product. So as this changes, as we fetch the product, then again we invoke the same thing. We invoke the dispatch with a type of load products
the payload will be equal to this product. Initially, it's going to be an empty array. And then once we fetch, well then we will invoke use effect one more time and as far as the payload we pass in the products. */

/* 4: handle this in the reducer. go on filter-reducer */

/* 5: for ProductList.js, instead of passing filter provider, we pass all the states, so filtered_products and all_products, and then go back in the ProductList */

/* 6: coming from GridView. On the initialState, set up the view. we have already passed the state */
/* go back on the ProductList */

/* 7: coming from sort.js. We already have the state value which is grid view, and by default it is true. So now of course what I would want is to set up two functions that dispatch two actions. One is going to be setGridView, so this is just going to set grid_view equal to true. and then one is going to be setListView, which of course will set it equal to false.
go back on Sort.js and attach both of these functions to my buttons and then I'll deal with them in the reducer. */

/* there are a few steps to get the Select working where we can sort our products. Now the first one will be setting up the control input, so I would want to have some kind of value in the state. And then as I'm clicking on the select, of course I'll change that value. And the second thing is going to be setting up the user effect that runs every time we change this state value. And then, of course, we'll sort our products */

/* 8: set up the value for Sort and default value, that needs to match one of the default options; let's use lower price. */

/* 9: for controlled input, there are two things: a state value, and the function we run every time there's a change in the input. I'm looking for that event object (e). Then we need name (e.target.name) and the value (the actual value, the option that the user is choosing). Look at sort.js,  we have name=sort and value= the different options. Then pass it in return FilterContext. Sort is already passed in the state.
Go on Sort.js to access both of them */

/* 10: we need to dispatch an action to update the state for sort. whatever string I am getting back, I would want to pass it in as a payload. So say payload is equal to the value. we need to handle this in the reducer.
Go on filter_reducer */

/* 11: we need another action in the userEffect; it has to runs every time we change this state value and also it runs after we set up the products. initially, filtered_products is an empty array, and since this fn will depend on this array, we need to add products in the dependency array.
so when the product changes, we will run this one as well the initial amount, and also when the state value of sort changes since that's when we will click on the input. once that value changes, I would want to invoke dispatch. No payload, only dispatch the action.
GO on filter_reducer */

/* I would want to set up the filters where we can actually control the amount of products that we are displaying. And then we'll still sort based on some value. Now, when we talk about filters, we need to set them up as controlled inputs. So in a state, I'll have some initial value. And then as I'm using the filters, of course I'll be changing those values in a state. And then based on that, I will filter products. */

/* 12: since there's going to be a bunch of filters and I only would want to use one function, I'll set up a property which actually is going to be an object in my initial states.
This list is what we'll see in the left, the filters. So, text= empty string because it will be choosen by the user, the company will be all by default, then the user can choose a specific company from the controlled input, and the same with the colors, no color by default choosen, etc..  I would want to map over those products and get the actual price. */

/* go on filter reducer */

/* 13: There's going to be two more methods, and I would want to set them up as placeholders so that way I can pass them down, since we'll start again destructuring everything in the filters component.
First method: updateFilters. this one will be equal to my arrow function. I'm going to be looking for event object and you can think of this function as a function where we're going to call it every time we change something. So we'll add onChange on all of them, on all our inputs. And then the moment something changes, this is the function we're going to invoke. And then also I would want to clear filters, which essentially just sets back the filters back to the defaults. Leave the functions empty for now 
Go back on FIlters.js */

/* 14: using the event object I can access the input or a element that is calling that onChange fn, so in this case the search form from Filters.js. I have to target the name value of that form so I can access the name And then I would also want to get the value, so whatever i'm typing. So now i can see in console what i'm typing. now I have to dispatch an action that changes the state value. And now the name does matter because filters is an object with different props and i want to change only the prop that matches to the value
of the name that is coming from the element. payload will be an object because there's two properties that I would want to pass in. name and value. */

/* go on filter_reducer to handle it */

/* 15: placeholder for the filtered products, with useEffect when i run the search input. Not the fn now but just a base for it. go on the useEffect fn. So every time the value in this object changes, of course I will run this effect. better to setup another action now. It's better to place it before sort_products because the order is we filter the products and only then we sort because filter will change the amount of products that we're displaying And then sorting is just responsible for sorting the items as far as the list.
GO on filter_reducer */

/* coming from filters.js n4. when we have a button, we cannot access the text inside of the button, since that's where I have my category as far as the value. So I cannot go with button and then that value, it doesn't exist. I cannot access it that way. If i click on a category, the app doesn't work because the category became empty string, i cannot access that value. I wouldn't want to go to my reducer and start adding if statements. So if it is a button, then I would want to do something else. I would rather want to do it right here in my function, in my update values.
we can't access the value in a button using the dot value property. That was possible in my input but not in a button. */

/* 16: how to solve this of before. vanilla js: textContent property to access that value */

/* go back on filters.js */

/* 17: from filters.js, i need a if state for colors to make sure that if the name value is equal to a color, well, then I'm just going to access that value a little bit differently since I know that it is a button that has that data set properly. i could use also get attribute and then just pass in the name. */
/* go back on filters.js */

/* 18: solve point 7 from filters.js. in this way i'll always get a number and not a string
go back on filters.js for shipping and clear functions */

/* 19: when it's about checkboxes, we're not getting the value (filters.js) and same issues with the buttons. how to fix. we're looking if the checkbox is checked or not. by default it's false because it's the state value
go back on filters.js to add the clear fn */

/* 20: clear filters. dispatch an action inside the clearFilters function. go on filter_reducer to manage the error */
