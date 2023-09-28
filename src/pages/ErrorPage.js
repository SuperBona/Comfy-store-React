import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    // 1
    <Wrapper className='page-100'>
      <section>
        <h1>404</h1>
        <h3>Sorry, the page you tried cannot be found</h3>
        <Link to='/' className='btn'>
          Back home
        </Link>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`

export default ErrorPage

/* the global class in wrapper, page-100, only add some height. global classes are on index.css */
/* 1: set up the error and go on about page */
