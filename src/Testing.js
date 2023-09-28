import styled from 'styled-components'

const Testing = () => {
  return (
    // 1:
    <Wrapper>
      <h3>hello world</h3>
      <p>hello people</p>
      <button>click me</button>
    </Wrapper>
  )
}

// 1:
const Wrapper = styled.section`
  h3 {
    color: red;
  }
`

export default Testing

/* there's many ways how we can export this particular component. */
/* 1: i go with the name Wrapper, then I create the element that is going to be displayed in a component and style it. Whatever functionality I place inside, this is going to be sitting in a wrapper and here I can apply all my styles. */
/* to render it, go back on App.js */
