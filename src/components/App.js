import styled from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Link from "./Link";
import AboutMe from "./AboutMe";
import Showcase from "./Showcase";
import Blog from "./Blog";
import GlobalStyle from "./GlobalStyle";
import ThemeProvider from "./ThemeProvider";
import ThemePreview from "./ThemePreview";
import MarkdownPreview from "./MarkdownPreview";
import StoreProvider from "../store/StoreProvider";

function App({ className }) {
  return (
    <StoreProvider>
      <ThemeProvider>
        <GlobalStyle />
        <Router>
          <div className={className}>
            <Navbar logo="Rubeniskov">
              <Link to="/blog">Blog</Link>
              <Link to="/about-me">About Me</Link>
            </Navbar>
            <Switch>
              <Route exact path="/">
                <Showcase />
              </Route>
              <Route exact path="/theme">
                <ThemePreview />
              </Route>
              <Route exact path="/markdown">
                <MarkdownPreview />
              </Route>
              <Route path="/blog">
                <Blog />
              </Route>
              <Route path="/about-me">
                <AboutMe />
              </Route>
            </Switch>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default styled(App)`
  display: flex;
  flex-flow: column;
`;
