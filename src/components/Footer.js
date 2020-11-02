import styled from "styled-components";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { urlResolve } from "../utils";

const Footer = ({ className }) => {
  let match = useRouteMatch();
  return (
    <div className={className}>
      <div>
        <Switch>
          <Route path={urlResolve(match.path, "blog")}>blog</Route>
          <Route path={urlResolve(match.path, "about-me")}>about me</Route>
        </Switch>
      </div>
    </div>
  );
};

export default styled(Footer)`
  background: rgba(0, 0, 0, 0.8);
  padding: 1em 0;
  color: white;
  min-height: 10rem;
  & > div {
    margin: 0 64px;
  }
`;
