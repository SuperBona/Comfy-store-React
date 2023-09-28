import React from 'react'
// 2:
import {
  BrowserRouter as Router,
  /*  Switch, */
  Route,
  Routes,
} from 'react-router-dom'

/* this import comes from index.js inside components folder */
import { Navbar, Sidebar, Footer } from './components'

/* using index.js (the one inside pages directory) to import a huge amount of components -> i import all the elements inside the pages/index.js and then i call them here or where i need */
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
  AuthWrapper,
} from './pages'
/* import AuthWrapper from './pages/AuthWrapper' */

function App() {
  return (
    // 2 - 4
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='cart' element={<Cart />} />
          <Route path='products' element={<Products />} />
          <Route path='products/:id' element={<SingleProduct />} />
          <Route
            /* 6 */
            path='checkout/*'
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  )
}

export default App

/* let's start here */
/*  1: to use styled components, npm install --save styled-components and import here
then, if I just want a simple element that I would want to add styles, I need to come up with the name. const N = styled.html-element I want`function with styles`
no name collision. I also can select a class inside a styled component. I don't have to be original with the names. I can set up my component.I set it up as a style component. And then inside of that style component, essentially, I can just use the same class names that I'm using in other components,  */
/* go on testing.js to see export styled components functinons. it doesn't affect functionalities. attention to not over-write. not suggested to nest selectors */

/* install react router - actual version : npm install react-router-dom@6 */

/*  2: build the router. We need a browser router and of course we gave it an alias as a Router, then also we needed a switch(version 5) or Route(version 6) and Routes. All my routes are right now in the page's directory and of course every component just reflect the page, and in order to render them I would need to import.
Inside Router there will be Switch or Routes (depend from react Router version). first component will be Home. Remember to use Exact property: We just made sure that we only navigate here if the path matches. For the last Route, this is going to be a product and then the URL param is going to be ID. and we need to have 
children prop. inside this I want to render the single product component. Then we have the checkout. checkout is going to be one that is going to be wrapped eventually in a private route. and then error page, that is going to match every path.
Then there will be components that will be displayed only in small screens and other for all screen sizes. Navbar, sidebar, footer. Those 3 will be outside the Switch
Look at the 3rd element in the webpage if i change the url in localhost3000/products or local./products/1 ecc with the routes */

/* let's work on the navbar, footer, sidebar. we have 2 layouts, for small and big screen. sidebaar is only for small screens. cart buttons will be separated components because they will be used in both sidebar and navbar.
Go on navbar component */

///////////
/* import testing.js and go to render it inside app function */
/* import Testing from './Testing' */

// 1
/* import styled from 'styled-components'
const Button = styled.button`
  background: green;
  color: white;
`
const Container = styled.div`
  background: red;
  color: white;
  .hero {
    font-size: 5rem;
  }
` */
/* function App() {
  return (
    <div>
      <h4>comfy sloth starter</h4>
      <Button>click me</Button>
      <Container>
        <div>
          <h3>hello world</h3>
        </div>
        <div className='hero'>hero text</div>
      </Container>
    </div>
  )
} */

/* exemple import styled components */
/* function App() {
  return (
    <div>
      <h4>comfy sloth starter</h4>
      <Testing></Testing>
    </div>
  )
} */

/* 3: we need to set up a private route where, again, we're going to check whether the user has logged in, and then if he or she has logged in, then, of course, we'll display the page. If not, then we will redirect back to the homepage. */
/* attention to the version of react-router-dom, here it is 6.15... online course use a previous one (5?) */
/* go on PrivateRoute.js page */

/* 4: put the app into AuthWrapper */

/* important video 739 fix warnings */

/* So how do we set up a payment gateway? Well, in this project, we're going to use Stripe and Netlify. We need netlify to work with Stripe too */
/* AVOID to install netlify-cli and try NPM run dev instead -> localhost:8888; npm run dev is good for spin up the server. remember to change url in auth0 page */
/* with netlify-cli, we're going to use serverless functions, that means that we from the front end just specifically say what we would want server to do. And of course there is a server the actual server on the other side. But we as front-end developers are not concerned with that.
We just type our code and we say, Hey Netlify take care of this. And then Netlify does the rest. but those netlify functions will run only in production, so we need everytime to push the changes on netlify. it will also use different console commands
For that reasons, avoid to install netlify-cli... but here it's already installed from the starter project but i can still work with npm run dev */
/* sudo npm i -g netlify-cli */

/* we need to create Functions folder outside everything and a file, netlify.toml, GO on the last one (we just wanna tell Netlify where the functions are located, we're gonna say that functions are gonna be in the functions directory..) */
/* GO on functions folder and create one, hello.js (test) */
