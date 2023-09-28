import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

// 1
const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const {
    loginWithRedirect,
    logout,
    user,
    error /* isLoading, isAuthenticated */,
  } = useAuth0()

  const [myUser, setMyUser] = useState(null)

  // 1 - 2 - 3
  useEffect(
    () => {
      /* 3 */
      setMyUser(user)

      /* 2 */
      /* if (isAuthenticated) {
      setMyUser(user)
    } else {
      setMyUser(false)
    } */

      /* console.log(`user': ${user}`)
    console.log(`isAuthenticated': ${isAuthenticated}`)
    console.log(`isLoading': ${isLoading}`) */
    },
    [user] /* [isAuthenticated] */
  )

  // 1
  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser, error }}>
      {children}
    </UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}

/* working with auth0, let's use the hook in userProvider, invoking it, And once we do that, we'll get back a giant data object with bunch of useful methods and properties.
isAuthenticated : That essentially is gonna be a flag. Then we have a loginWithRedirect : So this is a function that performs login functionalities. Then of course we also have a logout function and we have a user. So this is gonna let us know whether we have a user and what are the credentials for the user as well as isLoading. we won't use it but I still would wanna show you what values you'll see. And then of course I'm passing in the value, */

/* 1: I would wanna set up the useEffect just so we can see the values. So eventually there's gonna be a tiny tiny state value over here for the user. since I would want us to be on the same page I will set up the useEffect and I will invoke it every time the isAuthenticated changes. */
/* in the value of the return, I'll set up my JavaScript object and I would wanna pass down login function, logout function. And eventually there's going to be a user in a state which I'm gonna create in a second. */
/* so let's set up a state value too for myUser. i have a login btn, and with it user can login and log out. let's set them up. 
GO on CartButtons */

/* 2: once I'm authenticated, now of course I would want to pass in that data. So I would wanna set up my user. set up the logic in the useEffect. So if this changes, then of course we will reinvoke it. if isAuthenticated is true, then I'm gonna go to put setMyUser equal to whatever user I'm getting from the auth zero.
I do wanna add else though, for the log out. If the user logs out, then I don't wanna keep my user as that object or whatever I'm passing in over here. Instead, what I would want is go back to set my user and set it equal to false. */
/* we're going to check what is the value. Initially that value will be false. So we will kind of reset it back to null since that's our default value (useState). But then once we authenticate the user, then of course isAuthenticated will be true, however it will rerun because this value will change. So our use effect depends on that value (isAuth) and then we'll set this user (setMyUser) equal to the user, whatever we're getting back. */
/* GO on CartButtons to set up the conditions to show or hide login&logout btn */

/* 3: i'm coming from PrivateRoute now. Notice the useEffect. we're just checking for isAuthenticated. So in my case, I'm just gonna change it around and I'm gonna say setMyUser. So of course that is my function that is controlling the state. So setMyUser and in here, I'm just gonna pass in the user and I'm gonna do that every time the user changes.
So notice here I have this user effect, and then every time user changes and during the initial render, I set my user equal to the user that is coming from the auth0. */
/* Now as far as the imports from Use Auth, in this case, I don't need use Authenticated anymore. And the same goes for is loading. So let me remove both of these things. */
/* let's create the AuthWrapper.js component, GO on it */
