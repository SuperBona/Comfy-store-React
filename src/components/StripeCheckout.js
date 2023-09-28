import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { loadStripe } from '@stripe/stripe-js'
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from '@stripe/react-stripe-js'
import axios from 'axios'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
import { formatPrice } from '../utils/helpers'
import { useNavigate } from 'react-router-dom'

// 1
const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const CheckoutForm = () => {
  // 2
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext()
  const { myUser } = useUserContext()
  const navigate = useNavigate()
  /* stripe staff */
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const stripe = useStripe()
  const elements = useElements()

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }

  // 3 - 7
  const createPaymentIntent = async () => {
    /* console.log('hello from stripe checkout') */
    try {
      const { data } = await axios.post(
        '/.netlify/functions/create-payment-intent',
        JSON.stringify({ cart, shipping_fee, total_amount })
      )
      /* console.log(data.clientSecret) */ // this is linked to create-payment-intent.js
      // 8
      setClientSecret(data.clientSecret)
    } catch (error) {
      /* console.log(error.response) */
    }
  }

  // 4
  useEffect(() => {
    createPaymentIntent()
    // eslint-disable-next-line
  }, [])

  // 5 - 10
  const handleChange = async (event) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }
  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    })
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
      setSucceeded(true)
      setTimeout(() => {
        clearCart()
        navigate('/')
      }, 5000)
    }
  }

  return (
    <div>
      {/* 9 */}
      {succeeded ? (
        <article>
          <h4>Thank you</h4>
          <h4>Your payment was successful!</h4>
          <h4>Redirecting to home page</h4>
        </article>
      ) : (
        <article>
          <h4>Hello, {myUser && myUser.name}</h4>
          <p>Your total is {formatPrice(shipping_fee + total_amount)}</p>
          <p>Test Card Number : 4242 4242 4242 4242</p>
        </article>
      )}

      <form id='payment-form' onSubmit={handleSubmit}>
        <CardElement
          id='card-element'
          options={cardStyle}
          onChange={handleChange}
        ></CardElement>
        <button disabled={processing || disabled || succeeded} id='submit'>
          <span id='button-text'>
            {processing ? <div className='spinner' id='spinner'></div> : 'Pay'}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className='card-error' role='alert'>
            {error}
          </div>
        )}
        {/* show a success message upon completition */}
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment succeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            Stripe dashboard.
          </a>
          Refresh the page to pay again
        </p>
      </form>
    </div>
  )
}

const StripeCheckout = () => {
  return (
    <Wrapper>
      {/* 1 */}
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  form {
    width: 30vw;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  .result-message {
    line-height: 22px;
    font-size: 16px;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
  #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
  button:hover {
    filter: contrast(115%);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }
  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    content: '';
  }
  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
    }
  }
`

export default StripeCheckout

/* coming after netlify thing */
/* we're not exporting StripeCheckout at the beginning atm, there's gonna be some more data, and that some more data is going to be another component, and I'm gonna call this CheckoutForm.
in this StripeCheckout, we'll have to wrap CheckoutForm in some other components that we're getting from Stripe, */
/* let's import this component in the index.js component and export it and GO on CheckoutPage */

/* why we set it up this function is because from the StripeCheckout, we are gonna communicate with our other function, the one we haven't created yet, so from this StripeCheckout, we're not gonna directly communicate to the Stripe, 'cause that would be highly insecure, instead,
we're going to communicate with our function which is on a server, so this is not going to be on the front end, so this is gonna be only on a server, and from that function, we're going to communicate directly to the Stripe, get back the data, and send it back to our StripeCheckout,
so our function, the one that we're about to create. we'll use hello.js as a middleman where it'll pass the data to the function, function from the server, which is secure, well I guess more secure than just directly communicating to a Stripe, from the function we communicate to the Stripe,
Stripe sends back the data, and then we send it back to our component, */

/* 1: import the loadStripe fn, the js one, and the react components we need and stripe react js ones, axios (perform a post request to the function we haven't created yet, the Netlify function.) etc...
in loadStripe, we'd want to pass in the public key. inside of the wrapper of StripeCheckout we want the Elements component, with stripe, wrapping checkoutForm */

/* 2: let's take the components from Contexts, and History, that is just there once we complete the payment. Optionally, I'll show you how you can navigate away from the page.
And we're gonna go with succeeded. So that is if the payment succeeded. And we're gonna be creating local variables for that. So we're gonna use useState. And we also have to set up the client secret, this is something that we're gonna get from the function that we haven't created, the Netlify serverless function.
And then lastly, we need to invoke Stripe using useStripe hook. Basically set up the variable. And then the same goes for the elements. */
/* AAA: useHistory is now USENAVIGATE ! */

/* once we have the imports once we have the state variables now let's work on our basic return. Again, really no functionality, but we need to have a structure first */

/* 3: create a function, create payment intent that eventually it's where we'll setup the logic. it is going to be asynchronous since this is where we'll set up our post request for time being. */
/* 4: now let's set up a use effect as well. and we'll invoke it only once the component loads. */
/* 5: And then we're gonna have two functions, handle change and handle submit. both of them point at the event object, that we're getting from these functions */

/* 6: set up the form with Stripe setup. the button is gonna be disabled if we're processing, if it's disabled or succeeded.
button disabled={ ... } =  it is disabled if we are processing. So if processing is true (our state value if disabled is true), and also if succeeded is true. So if any of these values is true. then this button will be disabled, */
/* look at our initial values: succeeded is false, processing is empty string And then disabled is true. So we're checking for any of these values and all of them essentially are false. that's why the bnt is disabled now */
/* we need also to set up the error. So check the state value by the name of error. If it is true, then of course we'll display the error and we're using the and operator where say if the error is true, then I would want to display the div. do the same for success */

/* When the component, the StripeCheckout,or I guess more precisely, CheckoutForm mounts, what I would want is to send the cart data, the cart total amount, shipping fee, and clear cart to my function. So, the function we haven't created yet.
So first, I guess let's create that function so we can see something.
GO on functions folder and create new file, create-payment-intent.js and go there */

/* 7: what I would want is, like I said, grab my cart values and I would want to pass in the cart, total amount and shipping fee. And once the component mounts, I would wanna set up a post request. Now, why am I able to set up a post request? 
Well, because if we stop the server and if we go with netlify dev or npm run build, we should be able to navigate to that endpoint, correct? We already talked about it before, where the moment we created that, hello, we had a new endpoint on our server. So, this is gonna be, of course, where we set up that payment intent. */
/* look in the vsc console, you can get bunch of useful info about, well, what is the request? Correct? So, here, we have the path, for example, then we have a method and all that good stuff. So, now, what I would want from my StripeCheckout, when this component (createPaymentIntent) mounts, I would want to use Axios to post my data.
Because, basically, what I would want is pass what is in my cart, what is the total, what is the shipping fee and all that. I would wanna post that to this function. And in that function, I'm going to communicate with Stripe. At the moment, we're just returning some dummy data but eventually this is where we'll communicate with Stripe. */
/* in the createPaymentIntent, I would wanna set up try and catch because there might be a error as well. we're performing a get request.
Now, in this case, we use axios, async, and we are sending something to the server. Now again, our server is our serverless netlify function. the idea is exactly the same where if you have HTTP request, POST request, you're sending something to the server. and we need to pass in few things. First of all, well what is gonna be the URL? And URL needs to match what do we have here for create-payment-intent.
Now the second thing, we need to pass in the data. So, what we're sending? And again, we need to stringify, it needs to go as a string. So we go with JSON.stringify., and, here, the three things that I would want to pass in. So, I'm gonna set up the object. And again, this is happening when the component mounts, right away. */

/* look now in the vsc console. in the body now, if you're in the checkout page, we have the items we have in cart and the info we required; it's a string, we have to parse the body. 
GO on the fn create-payment-intent.js. look at the object logged in browser console, we can see all datas, also clientSecret */

/* 8: So now what I could do is invoke my setClientSecret. Now if you want, you can destructure it here. So I can simply say, when I get back my data just pull out right away this property. And then if I'm successful, then I'm just gonna go with setClientSecret and then I'll pass in data.
We wanted this clientSecret because in the background we have communicated with the stripe. And then the moment I come here to the checkout page, I already get this clientSecret. So now the only thing we really need to do is just work on our handleChange and handleSubmit. we can check out the clientSecret in the components from browser */

/* 9: I would wanna set up some kind of text, where before we have our payment completed, I want to grab the user, the username that is coming from my user object, I would want to display my total, and I also would wanna display the test card number. Stripe docs show how to use a fake card number to test, in payments section. 
depending on the value of succeeded, I'm gonna show those messages. So if succeeded is true, then there's gonna be one type of message, and if not, then there's gonna be something else.
keep in mind one thing though, that user initially is gonna be undefined. And since I would want to get the name, 'cause in the user object, I do have the name property, if I'll try to get that name when the user is undefined, I'm not gonna be successful.
That's why I'm gonna go with myUser, check if it exists, and then if it exists, then I would want to grab the name. at the moment, succeeded is false. That's why we have here, "Hello, .. name" */

/* 10: handleChange. this component and the otger one are on Stripe, we haven't create it on our own. on that event, there's gonna be empty property. in the handleSubmit, of course we would wanna prevent the default first, essentially Stripe will take care of those errors for us. So we won't have to do anything.
And once we prevent the default, now we would wanna set processing value to true. So again, initially, we set up processing state value, and then the moment we're submitting the form, now we're setting this to be true. this will cause the spinner (loading) such as the StripeCheckout button. 
Then I would want to get the payload from the Stripe. So remember, we use this useStripe and assign it to a stripe variable. So first time, we communicated with the Stripe in the background using our create-payment-intent. Now we're gonna do that from the frontend, but of course, we'll pass in that client secret that we got back from our backend.
We still need to use the Strapi docs with the new variable, payload, and let's set up the error too.
Now, I would still wanna display some kind of message. That's why I'll wrap this one in the setTimeout where, once the timeout expires, which is gonna be in 10 seconds, then I'll navigate to the homepage. */

/* to test it, use card number provided, as far as the other values, use at least current year, and at least the current month, you're gonna be good for the date. And then the other ones, you can really add whatever you would want. We can see the payments in Stripe - payments section */
