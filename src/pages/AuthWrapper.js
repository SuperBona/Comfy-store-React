import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'

// 1
function AuthWrapper({ children }) {
  const { isLoading, error } = useAuth0()

  // 2
  if (isLoading) {
    return (
      <Wrapper>
        <h1>Loading....</h1>
      </Wrapper>
    )
  }
  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    )
  }
  return <>{children}</>
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`

export default AuthWrapper

/* this component will wrap the Routes, all the app.
Let's do, before, a change in PrivateRoute
And essentially we're just gonna be checking. If we're loading, then we'll display a loading message. If there's error, we'll display the error message. And eventually, once we're done loading, then we'll display children, which is gonna be our whole app. */

/* 1: once I have this setup in this function here, I'm gonna be looking for children. Because I'm gonna wrap my whole application in it. And once I get the children, then instead of the component, I would want to destructure two things from the use auth: isLoading and error  */

/* 2: now I would wanna check if I'm loading, then I would wanna return essentially some kind of loading message. If i have an error, i'll have the error, and if I'm not loading, if there is no error, then eventually I'll just wanna return a react fragment. And inside of it I'm gonna look for my children. */
/* And now I need to get this wrapper to my app.js. And remember in the pages we created that index.js. 'Cause that just made it simpler when we need to access the component. */
/* GO on index.js of PAGES to import and export this component and then in App.js */
/* So this, with auth0 gives our app enough time in a private route to check for the user, so that way we're not right away directing to the homepage. */
