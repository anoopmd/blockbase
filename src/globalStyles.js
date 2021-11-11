import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    color: var(--color-text-primary);

    font-kerning: none;
    text-rendering: optimizeSpeed;
    letter-spacing: normal;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";

    min-width: 1024px;
    min-height: 100vh;
  }

  .font-inter {
    font-family: Inter;
  }

  .font-monospace {
    font-family: monospace;
  }

  main.blockbase-app {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
  }

  div.container.root {
    width: 100%;
    min-height: 100vh;
    min-width: 320px;
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
  }

  div.footer {
    max-width: 1024px;
    margin: 0 auto;
  }
`;
 
export default GlobalStyle;