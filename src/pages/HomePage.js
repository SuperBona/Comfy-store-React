import React from 'react'
import { FeaturedProducts, Hero, Services, Contact } from '../components'
const HomePage = () => {
  return (
    <main>
      <Hero></Hero>
      <FeaturedProducts></FeaturedProducts>
      <Services></Services>
      <Contact></Contact>
    </main>
  )
}

export default HomePage

/* set up the page. the one page where I'll set up all the functionality as well as the return which is going to be bigger, is of course going to be the single product page.
here i want to render the imported components. and now go on components, hero.js */
