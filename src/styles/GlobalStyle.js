import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    color: #333;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center; 
  }

  #root {
    width: 100%;
    max-width: 380px;
    background:#ffffff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

`;

export default GlobalStyle;
