import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { FaTimes } from 'react-icons/fa'
import { links } from '../utils/constants'
import styled from 'styled-components'
import CartButtons from './CartButtons'
import { useUserContext } from '../context/user_context'

const Sidebar = () => {
  // 4 - 6
  const { isSidebarOpen, closeSidebar } = useProductsContext()
  const { myUser } = useUserContext()
  /* console.log(data) */ //now i can see the values
  /* 1 */
  /* const isOpen = false */

  return (
    <SidebarContainer>
      {/* 4 */}
      <aside
        className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}
      >
        <div className='sidebar-header'>
          <img src={logo} className='logo' alt='comfy sloth' />

          {/* 5 */}
          <button className='close-btn' type='button' onClick={closeSidebar}>
            <FaTimes></FaTimes>
          </button>
        </div>

        {/* 2 */}
        <ul className='links'>
          {links.map(({ id, text, url }) => {
            return (
              <li key={id}>
                {/* 5 */}
                <Link to={url} onClick={closeSidebar}>
                  {text}
                </Link>
              </li>
            )
          })}

          {/* 6 */}
          {myUser && (
            <li>
              <Link to='/checkout' onClick={closeSidebar}>
                checkout
              </Link>
            </li>
          )}

          {/* 3 -> moved in point 6 */}
          {/* <li>
            <Link to='/checkout' onClick={closeSidebar}>
              checkout
            </Link>
          </li> */}
        </ul>
        <CartButtons></CartButtons>
      </aside>
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
  text-align: center;
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    transition: var(--transition);
    cursor: pointer;
    color: var(--clr-red-dark);
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: var(--clr-red-light);
  }
  .logo {
    justify-self: center;
    height: 45px;
  }
  .links {
    margin-bottom: 2rem;
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--clr-grey-10);
    color: var(--clr-grey-2);
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--clr-white);
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .cart-btn-wrapper {
    margin: 2rem auto;
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`

export default Sidebar

/* also this component will be displayed in all the pages, with navbar and footer. we need to set up all the functionalities and the conditions based on login and logout funct too. useUserContext will get me the value whether the user has logged in or hasn't logged in.
So if the user has logged in and of course I would want to display the checkout, if not, then I'm

going to hide it. */

/* 1: I will hide the sidebar as default and only if there is the class 'show-sidebar', so with className i set the conditions, i'm going to display it. i also set the function isOpen on true */

/* 2: for the links i iterate over, desctrucutre - each link is an object so i can either have it as a name or destructure. eventually there's going to be onClick since I would want to close the sidebar once I click on the links. Attention to () and {} */

/* 3: display the checkon one by default. Eventually, of course, we will check whether the user is there. I place cart buttons too */

/* how to toggle the sidebar? i'm going to reiterate and set it up globally, because i also could navigate to app.js and create the functionality there,
and pass it in Navbar and Sidebar component. as far as opening, I definitely would want to access that functionality in my navbar. but more places i have my functionalities in, more complicatet is to manage all of them around.
App.js should just be responsible for rendering my pages. So if I know that there's some issue with pages, I go here instead of coming here. that's why a better setup would be actually getting this from the global context.
Let's go on products_context.js and index.js */

/* 4: as far as the sidebar, we'll look for two things I would want to look for close sidebar function, since I would want to run it when I click on a button as well as the links. And eventually we'll also have to pass it into the cart buttons.
So now I'm checking for this global property, isSidebarOpen, meaning property that is coming from my product context. And if everything is correct, we should still hide the sidebar. */

/* 5: once I click on a button, of course I would want to run close sidebar. So, so let's set up here on click. same setups for the links, checkout and later with cart button. go on cartButtons.js */

/* 6: add checkout page if user is logged in. then go in CartTotals */
