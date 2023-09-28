// domain/.netlify/functions/hello (file name)

const items = [
  { id: 1, name: 'john' },
  { id: 2, name: 'susan' },
]

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: 'hello world',
    /* body: JSON.stringify(items), */
  }
}

/* this part is relate to node. this is the basic setup. in the fn we need to pass 2 arguments, a common practice is calling this event and context. And from this function, I would wanna return a object. Now, since this function is async, of course, we already know that actually, you are returning a promise, but we go here with return. */
/* statusCode:200 = successful response */
/* so if this work (restart the server), we can set it up our StripeCheckout. once you set up that function, that function is available everywhere. So even if you go to a complete project and you go with /.netlify.functions, and then /hello, you'll see a nice Hello World, 'cause once you push this up to the production, the functions are available, */
/* from this page, I can return whatever I would want, so for example here in the body, I could set up some kind of array, as long as we return a string, we can set this up as the API */
/* in the source, in the components, let's create the StripeCheckout component */
