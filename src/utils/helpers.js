// 1
export const formatPrice = (number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(number / 100)
}

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type])
  /* console.log(unique) */
  if (type === 'colors') {
    unique = unique.flat()
  }
  return ['all', ...new Set(unique)]
}

/* 1: functionality for the price -> number format method. set up local currency and pass in the object. we'll still have to divide this by 100, the price has to be in cents.
Now when we talk about increasing decreasing the items in the cart as well as actually calculating the totals, all of that is going to be happening in a cents, because those are round numbers, those are not decimals.
So we created the new format. We can actually display whatever the price is. now i want to work on the single product. go on products.js */

/* 2: we need to set up the fn for the unique values from Filters.js. i want to get my two parameters, so the arguments that I'm passing in; first one is all_products = to data. And essentially that's what I'm calling. And the second one is type. So that is going to be that string type. Use map method. I'm accessing the prop dinamically.
from this fn i want to return a new array with the prop of all and spread out the new Set, that is going to be the data type that gets me only the unique values.
I'm passing in the data and I have the specific type, and each type I'm passing in that string, and then I'm saying get me all of them, get me all the possible categories as well as the colors And lastly, now let's deal with colors because of course, with colors, we'll have to do a little bit more work because colors is an array.
What I would want is to flatten them. And we'll do that by just checking if the type if the string is actually equal to colors, then we'll run the flat method. So if type is equal to colors, if that is the case, then I would want to flatten my unique.

/* go back on filters.js */
