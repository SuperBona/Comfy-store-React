// domain/.netlify/functions/create-payment-intent

// 3
require('dotenv').config()
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

exports.handler = async function (event, context) {
  /* console.log(event) */

  // 2
  if (event.body) {
    // 1
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body)
    /* console.log(cart) */

    const calculateOrderAmount = () => {
      return shipping_fee + total_amount
    }

    // 1 - 4
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'EUR',
      })
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      }
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) }
    }
    /* return {
      statusCode: 200,
      body: JSON.stringify(cart),
    } */
  }
  return {
    statusCode: 200,
    body: 'Create Payment Intent',
  }
}

/* let's see first at all what we're gonna get in the event */
/* GO in the StripeCheckout */
/* 1: we need to parse the body (StripeCheckout.js, point 7). destructure the props in the object */
/* look at the body now in the vsc console, now we have POST, we're sending these data to the server, the netlify fn */
/* we need to take the elements, so stringify in the body, and send back to cart. so log in the vsc console (refresh checkout page) and look at the objects we have in the cart. we have our products now */

/* 2: I'm gonna set up if and else, where I'm gonna say if event and then body actually exists, only then, I'm sending back this one, otherwise, I'm just gonna say return and statusCode and something. */
/* when we use the browser to navigate there, create-payment-intent well we are performing a get request but what I would want is, of course, the post request. So, all our logic is gonna be when we're setting up the post request. */
/* So, that should be our initial setup where we pass our data to the server and now have to do our magic in the server where we will connect to the Stripe, get back our token, the secret client token,
or whatever it was called as far as the state value, ClientSecret, that was the name. And then, we'll be able to move on in our checkout. */
/* so I have just to check for post requests, essentially we're checking if there is a event.body property on the event object. Then we're responding with our cart that we're sending from the checkout. And if not, then we simply just say "Create Payment Intent."
And now, of course, I would want to communicate with Stripe, get the secret token or client secret and then send it back to my front end. */
/* i can't acces to my react environment variables from here because this is Node, but i need them because when we push this up to the GitHub, I don't want to share my secret key. we need to get a package that allow us to access them: dotenv */

/* 3: let's get the dotenv package, attention to the syntax. and then get the stripe, I will set up a variable because we'll have to invoke a method later on. we need to pass in the secret key. That way of course the stripe knows which account we are trying to connect. */

/* 4: And now in the event.body where we have the if statement, now, of course, we'll set up more logic.m And first of all, I would want to set up a function that gets me the amount because as you can see right now we're passing in the cart, we're passing in the shipping_fee and total_amount.
So before I connect the stripe, which, of course, eventually we'll do, now I would wanna calculate my total. The fn is calculateOrderAmount< and then pass in the items.
this is where you connect your own backend on your own API and get the actual values. So essentially you communicate to your backend, you pass in the IDs and you get the actual value of the items. */
/* Now in our case we'll simply get our total plus the shipping fee. So honestly, this cart, we just passed in for demonstration purposes 'cause we're not gonna use that. But normally yes, you would iterate over that cart, you would grab those IDs, you would connect to your own API.
So that's not Stripe's API, that's your own API, or the backend or whatever you're using. And then grab the actual cost. So if you have ID one and if in your API the cost for that particular item is $20, then you would get back $20. In our case, we're not gonna do that. We're just gonna add shipping_fee plus total_amount. */
/* instead of returning the statusCode in the return, of course now I'm gonna set up try and catch. and as concern the amount prop, we always set up everything with cents 'cause when it comes to this amount we're looking for the value in cents not in dollars, but we're looking for smallest value. */
/* attention to the return logic! this is what i'm sending back to my StripeCheckout. statusCode: 500 = error */
/* GO back on StripeCheckout to set up the error in the createPaymentIntent */
