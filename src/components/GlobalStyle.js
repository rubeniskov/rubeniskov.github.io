import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
      min-height: 100vh;
  }

  body {
    height: 100%;
    color: rgba(0, 0, 0, 0.8);
    line-height: ${(props) => props.theme.font.lineHeight};
    font-size: 16px;
    font-family: ${({ theme }) => theme.font.family};
    line-height: 1.5;
    letter-spacing: 0.05rem;
    font-size: ${({ theme }) => theme.mixins.fontSize(2)};
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ${(props) => props.theme.mixins.headers()}
  *, *:before, *:after {
    box-sizing: inherit;
  }
  blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: .25em solid #dfe2e5;
    margin: 0;
    margin-bottom: 16px;
  }
  [id] {
    scroll-margin-top: ${({ theme }) => theme.navbar.height};
  }
`;

export default GlobalStyle;
