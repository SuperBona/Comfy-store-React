import React from 'react'
import { Route, Routes, /* Redirect, */ Navigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
/* import { useUserContext } from '../context/user_context' */

const PrivateRoute = ({ children }) => {
  const { user } = useAuth0()
  if (!user) {
    return <Navigate to='/' />
  }
  return children
}

// 1 - 3
/* const PrivateRoute = ({ children, ...rest }) => { */
/* const { myUser } = useUserContext() */
/*   const { user } = useAuth0() */
/* console.log(children)
  console.log(rest) */

// 1 - 2 - 3
/* return (
    <Routes>
      <Route
        {...rest}
        render={() => { */
/*  return */ /* myUser */ /*  user ? children : <Navigate to='/' />
        }}
      ></Route>
    </Routes>
  )
} */
export default PrivateRoute

/* two options:  history.push, UseUserContext */
/* 1: remember that in the app.js when we're setting up this private route, we're still passing these props (exact, path) and that's extremely important because of course I want to use them, because if the user has logged in, then I still wanna direct the user to whatever page he or she wants to go, in this case, Checkout.
in order to collect those values, we would wanna go here with our params. I'm using "Children" Because, of course, whatever is inside Private Route, that is something that I would wanna return because also keep in mind that we can use this private route in multiple places if we set it up correctly, and then the second thing is the rest of the parameters, */
/* in js we have the operator named RestOperator, use it when working with function parameters though, so don't confuse it with Spread. So Spread essentially just spreads out all our values. If we have an array, then it spreads out into individual items, but Rest Operator, and when we use it, of course, in the function parameter, it does the opposite
So what this rest is gathering is everything that we pass in 'exact path='/checkout' . So we grab the children, this is gonna be the checkout, of course, and then we grab the rest of the parameters. */
/* let's grab the user. We get our hook, and then I would wanna set up the route. So now, exactly like we have in app.js for rest the route, I'm gonna use my route. I'll spread out my rest. So now, I'll spread out those props that I gathered in rest spread out in the Route. */

/* 2: once I've spread out all my props, then I would wanna set up a special prop by the name of "Render," and then inside of this prop, the render prop, this is where I'll pass in the function first. if the user exists, then I would want to grab the children, which of course, in our case, is the checkout, And if not, then we return a redirect. */
/* so now we should be able to go back to home even if we try to go on the checkout page by the url, /checkout */
/* ATTENTION, with v6, REDIRECT doesn't work, use NAVIGATE instead */

/* but at the moment if I go to /checkout, I'll actually gonna be directed back to the homepage. Now, why is that happening? Because it takes longer for us to get the user from our context than it normally would be from the auth zero.
GO on the user_context */

/* because using the AuthWrapper, now we need to do some changes here */

/* 3: get user from Auth0, changing the import (useAuth0) and, instead of use user context, which just comes in as a value later, we'll directly access the hook useUserContext. So we're not looking for myUser, that is the value in my context. In here it is called User. And we're gonna go with use off hook and we're gonna invoke it.
if the user exists then of course I'm gonna display children, which essentially is my checkout page. If not, then redirect to the page. Now, we still need to set up the auth wrapper. So instead of getting the user from our context now we're getting user from the auth zero.
We still need this myUser 'cause we're using it in multiple other components and we're not gonna change that functionality. But for this checkout page we have to get the user from Use Auth0 essentially the hook that Auth zero provides. */
/* GO on AuthWrapper */
