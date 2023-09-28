import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.svg'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { links } from '../utils/constants'
import CartButtons from './CartButtons'
import { useProductsContext } from '../context/products_context'
import { useUserContext } from '../context/user_context'

const Nav = () => {
  // 3 - 4
  const { openSidebar } = useProductsContext()
  const { myUser } = useUserContext()

  return (
    <NavContainer>
      <div className='nav-center'>
        <div className='nav-header'>
          {/* 1 */}
          <Link to={'/'}>
            <img src={logo} alt='comfy sloth' />
          </Link>

          {/* 3 */}
          <button type='button' className='nav-toggle' onClick={openSidebar}>
            <FaBars></FaBars>
          </button>
        </div>

        {/* 2 */}
        <ul className='nav-links'>
          {links.map((link) => {
            const { id, text, url } = link
            return (
              <li key={id}>
                <Link to={url}>{text}</Link>
              </li>
            )
          })}

          {/* 4 */}
          {myUser && (
            <li>
              <Link to='/checkout'>checkout</Link>
            </li>
          )}
        </ul>
        <CartButtons></CartButtons>
      </div>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`

export default Nav

/* this is a styled component, look at the styles and how to set them up. here, img is a local component, but we can import them from api too. we have global context too */
/* 1: let's place homepage link in img logo. since navbar is displayed in all the pages, in app.js, we can see it in all the pages. as regardin the button for small screen layout, i'm going to use nested items because i want to nest the icon */

/* 2: set up the links that will be hidden in large screen. because i have sidebar too, in small screens they will be in the sidebar. set the links up in one single place and render them. navigate in Utils folder and constants.js. there is links component
with each link for each page, and we have the id for the key prop. There is no checkout page in that file, we'll have to do it somewhat manually because checkout will be only displayed if the user has logged in.
So, instead of set up every single link, i iterate over the links from the constants.js. let's go then on CartButtons.js */

/* 3: import useProductContext here too and the function to open sidebar, and add onclick.
Once I click, I can see the sidebar because now of course we change the global property. I have all my links. I can close it so I can open it up again. And then once I click on one of the links again, I closed the sidebar and i'll be in the selected page.
Now, let's setup the error page. go on pages folder, errorPage.js */

/* coming from CartButtons auth part */

/* 4: we have a link for checkout. I use useUserContext to have access to myUser. we'll just check If the user exists, then we're displaying the link to checkout. If not, then we don't. we just say if the user exists, then display this list item (chekout) */
/* do the same in sidebar and then go in CartTotals */
