import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  // 1
  return (
    <main>
      <PageHero title='about'></PageHero>
      <Wrapper className='page section section-center'>
        <img src={aboutImg} alt='nice desk' />
        <article>
          <div className='title'>
            <h2>our story</h2>
            <div className='underline'></div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              quas nostrum ducimus expedita, tempora voluptatum? Mollitia nemo
              repellendus esse ea molestiae! Beatae architecto nemo sint. Hic
              animi cum optio suscipit dolorum, molestiae nesciunt numquam,
              repellendus libero nihil, quos recusandae provident! Dolores eos
              blanditiis odio exercitationem autem beatae pariatur sit veniam!
            </p>
          </div>
        </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage

/* 1: let's start by displaying the hero component (it's a separate component) and set up the two columns layout with 3 global classes to add. the title is going to be the current page because this is going to be the link that always points back to the homepage. */
/* go to to pagehero.js in the components */
