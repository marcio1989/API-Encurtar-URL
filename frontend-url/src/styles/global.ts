import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  p, a, span, td, h1, h2, h3, h4, h5, h6{
    font-family: 'Roboto', sans-serif;
  }
  a{
    text-decoration: none; 
  }
 
`;

export default GlobalStyle;

//estilo das fontes do corpo da paágina