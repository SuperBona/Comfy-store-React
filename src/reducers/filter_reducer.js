import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  /* 1 */
  if (action.type === LOAD_PRODUCTS) {
    /* 5 */
    let maxPrice = action.payload.map((p) => p.price)
    maxPrice = Math.max(...maxPrice)
    /* console.log(maxPrice) */

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      /* 5 */
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    }
  }

  // 2
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }

  // 3
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }

  // 4
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state
    let tempProducts = [...filtered_products]
    if (sort === 'price-lowest') {
      /* console.log('price-lowest') */
      tempProducts = tempProducts.sort((a, b) => a.price - b.price)
    }
    if (sort === 'price-highest') {
      /* console.log('price-highest') */
      tempProducts = tempProducts.sort((a, b) => b.price - a.price)
    }
    if (sort === 'name-a') {
      /* console.log('name-a') */
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sort === 'name-z') {
      /* console.log('name-z') */
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }
    return { ...state, filtered_products: tempProducts }
  }

  // 6
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload
    return { ...state, filters: { ...state.filters, [name]: value } }
  }

  // 7 - 9
  if (action.type === FILTER_PRODUCTS) {
    /* console.log('filtering products') */
    const { all_products } = state

    const { text, category, company, color, price, shipping } = state.filters

    let tempProducts = [...all_products] //this is the new array because we'll overwrite every time we have some kind of filter functionality.

    //filtering
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text)
      })
    }
    if (category !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      )
    }
    if (company !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      )
    }
    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color)
      })
    }
    tempProducts = tempProducts.filter((product) => product.price <= price)
    if (shipping) {
      tempProducts = tempProducts.filter((product) => product.shipping === true)
    }

    return { ...state, filtered_products: tempProducts }
  }

  // 8
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    }
  }

  /* return state */
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer

/* at the moment I'm just going to return a state since of course, we're not handling that action yet. */

/* 1: we have two properties, we have all products and filter products. Now I would want to set my products that are coming as a payload equal to both of them, but we need to use the spread operator.
Now why we're doing this is because if we all just set it equal to all_products and the same for the filtered products, What is going to happen is that once you filter the products, you kind of go back to the default because the way the JavaScript works will point to the same place in the memory.
So if we use the spread operator (...) now, we're just copying the values. now we don't need anymore a return state */
/* filtered_products: the one that will change; all_products: will stay like this by default. if we need to go back to the defaults, we'll just set the filter products equal to all products. */

/* Go on ProducstPage */

/* 2: toggle values for the two different views. Now when we select one of the views, the layout of the products change, because we're changing the value in the state, in the product list. In the components view of the webpage we have FilterProvider, and we can see in the reducer ' grid_view' = true or false.
grid view is true and once you click on the other btn this is false. Since this is false, in a product list we are returning a list view and since we attached this class of active to the buttons, if the value matches to the one we're looking for, of course now the button is active. */

/* go on filter_context now */

/* 3: let's handle the sort. i want to change the sort stateValue depending on what is going to be selected. Look in the components of webpage, filterProvider, reducer, sort. When we click on a different option now, the default one will change with the selected one. Now we have to sort the items depending the value. We are going to control the order of the items based on the value
sort method comes from js. Go on filter_context */

/* 4: handle sort_products from filter_context. we'll set up four or more if statements for every state value that we have, for sort. let's get two values out of the state. First, I would want to get the sort value. So I would want to know how I should sort it. And then the second one will be those filtered products.
Now the second thing will be a temp product array, which will change depending on my state value for my sort. we need let because it will change. So I have four if statements and if the value matches, then of course, I'll just set this up to be equal to whatever I'm filtering, meaning more precisely sorting */

/*  let tempProducts = [...filtered_products] and  return { ...state, filtered_product: tempProducts } -> just in case, if there's some weird scenario where none of them match, then at least I display something. */

/* in the sort function (tempProducts.sort) we need to access two items, the current one and the next one. I can use the parameters i want, like a, b , it doesn't matter. a is the old item, b the new one. let's use the implicit return in this case.
if you want to sort some items starting with a smallest value, first, we just need to go with item, which in our case of course is the product. Products are array, each item is an object. when we sort we are iterating over the array. what I would want to do is compare my items based on that price. So A and B represent the current item and then the next item, meaning my product.
And then I would want to sort them based on price by placing the smallest item first. So that's why I'll go with a price minus B price.
Now, if we want to sort buy the largest items first, then we'll just copy and paste and we need to flip the values again.
Now when it comes to comparing by the name, prior to the method that I'm about to show you, we needed to write a few lines of code. - string.prototype.localeCompare() - we're simply passing one value, you compare it to the second value and then if the output is the one that we're looking for, then of course we just return new or all the items.

There's a longer way to do this: 
if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => {
        if (a.price < b.price){
          return -1
        }
        if (a.price > b.price){
          return 1
        }
        return 0
      })
    }
*/

/* go on filter context */

/* 5: once I load those products, I would also want to set up two values in my state, more precisely in my filters. So once I load my product, I would want to map over, get the highest price, and then just set it up over the max_price value in filter context. And the same I'm going to do for the price. This is to avoid to use a random value as max price, we want to be accurate and have the max price we have on the products as the max_price filter. P = products, products are in a payload
I just need to use the math dot max method that comes with JavaScript where I would want to pass in these values and get me the max one. Now in the max method though, we cannot pass in the array. That's why we'll use the spread operator. in this way we can see what is the max price we have between the products.
Now i want to add this value to my state, more precisely in the filters. I'll set my max price to be this value as well as the current price, because by default I would want to set up my range where I start with my max price order. copy the previous values {...state.filters} and change two values. We still need to display them but we can see them in the components from the webpage, and we need to set them up all one by one */

/* go on filter_conext */

/* 6: set up the action for update filters. coming from filter_context after n. 14. destructure the things from payload, so name and value, because i'm passing an object. and in the filters (in the return here), I would want to update those values just like we did when we worked with Sort.
So we're going to go with return first. Want to return my whole state just in case there's some other properties, which of course we have. Then remember filters was an object. So again, we need to do the same: {{...state.filters} so we don't lose out any other values. And then finally, if I would want to access the property dynamically, I simply go with name, so whatever I'm passing in, and then the value.
we are setting up that property dynamically. Since filters is an object I'm just saying whatever name value I'm passing in access that property and set it to my value. Now has a controlled input, check out in web components, filterProvider, filters, text state value. we're dinamically accessing that state value */

/* go on filter_context */

/* 7: add the conditions for filter_products action from filter_context to avoid error. coming from n. 15 of filter_context. So we have our first controlled input, which is going to be our text input. And then also every time I set something up in that input, I'm filtering the product, which at the moment is just console logging. */

/* regarding the different filters, (category, company, colors), I would want to set up the unique values and it's going to be extremely similar to one of the projects did, the menu project. each item was either breakfast, lunch or shakes. And also we have this option for all. We iterate over array and we got back only the unique values plus we added 'all'. */

/* go on filters.js */

/* 8: clear filters (from filter_context). Back on the state value with the clear function, but I would wanna leave the min price and max price to be whatever I have as a default. Since these are the two things that we wouldn't want to change.
That's why we're back in filter reducer. I'll also say that first I would want to get all the properties. So state.filters like so and I'm gonna spread them out. That's why I'll be able to remove min and max price. And also I would wanna set my price back to the maximum. */

/* whit all of this, so now that we have all the filters, we have created the UI, user interface. 

9: we just have to set up the function that is going to filter the products. it's here, the action Filter_Products. we call this fn everytime we have changes in the state filters, so if we applay some change to the filters. one by one, let's add the fn to the filters. we'll have two values: filtered_products, so the array that is gonna have the results of our filter product, and all_products. 
The first one is the one that display our filtered products array in the UI, so it's always going to change and needs to have the value of all the products. So before I filter anything, I always start with a fresh copy of all the product. And then when I'm done, I'm returning a state. and filtered_products: tempProducts, So the array is gonna be responsible for filtering out the product.
So, we always wanna start with fresh set of data where we have all the products, and only once we're done with our functionality, so once we're done filtering, once we're done setting up all our functionality, then we want to return filtered products equal to whatever array we're getting back. it's about start from scratch everytime.  every time you set up some kind of filtering you always, always need to have access to that default data. Otherwise it's just not gonna work.
now i have to get those filters out of my state. I would want to check those values as well. So, right after the destructure of products we need all the filters and start filtering. So essentially I'm gonna filter and my new value right now is gonna be whatever I'm getting back from this filter.
And then you can already see that I'm setting up my filtered products, the ones that I'm displaying equal to tempProducts, So whatever I'm gonna get back from this filter is gonna be that value displayed in my product page. in every if statement we are overriding the value of tempProducts. So we're setting it up equal to a new value.
I will use the string method by the name of startsWith And then I just want to pass in that text, So the text that is coming from my state. So if the product starts with a text then I'm returning the product. If not, then the product is gonna be removed from the array.
Now, if I type a letter in the search, i'll see only the ones that start with that letter, or more letters, only the products that match my search. it's about all_data, not the filtered ones.
when I dispatch the FILTER_PRODUCTS, I always start from the scratch. I always start by setting up my tempProducts equal to all the products and only when I'm done with my functionality, only when I filter out my array quite a few times, so essentially for every state value I have, then I return the filtered products equal to whatever I have.
If of course, I'm going to back to the default, of course I am dispatching the action because there was a change in my state. In the state filters more precisely. And then since I'm going back to the default, I'm sending back to all the products. And then text will be false. Because if I remove everything, now I'm getting all the products.
and now of course, we just need to add those other options as well. So we start with text, then we have category, etc...

if the category is not equal to all then of course I would wanna filter based on that category. But then if the category is all, I wouldn't want to run that condition because I would wanna see all the categories. if categories is not equal to all then I would wanna do the filtering based on certain category.
if we already have filtered based on text, now we're just adding to tempProducts array. 'Cause we need to keep in mind that once I'm done with the first (text) condition, if this condition is met, I possibly already have less products. Because I already filtered. So now, when I'm grabbing the tempProduct, this is gonna be filtered already if, of course, there was a text value. And then one by one, we'll just add more of those conditions.
with filter() method We'll say that I only want the product whose category value matches to whatever I have in the state. Now, if i click on a category, it's working. And i want to combine these filters too.

Company

Colors: it's an array, so each item has the color, but the color is an array. with find() method I'll say check in the array if the color matches to the one that is coming from the state. So that means that of course that product has that color. So of course I will return it.

Price and shipping. as far as the shipping, I just want to check whether the shipping value is true. The one that's coming from the state. If it is true then I would wanna run it against all my products. And of course the ones that have shipping true will be returned. 
with price, I'll say if the product price property is less or equals to the price that is coming from my state, So as I'm gonna be changing this value, I'm gonna be checking for the price property in all the products. And then if the price is less then I would wanna return those products. If not, then it'll be excluded from the array. Product price property less or equals to my current price.

Now let's deal with cart.
GO on cart_context.js */
