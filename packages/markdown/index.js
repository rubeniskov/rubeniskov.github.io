import styled from "styled-components";
import { lazy, useMemo } from "react";
import ReactMarkdown from "./react";

import Editor from "@rubeniskov/editor";

const sandboxes = {
  glsl: lazy(() => import("@rubeniskov/sandbox/glsl")),
};

const mappings = {
  js: "javascript",
  md: "markdown",
  "-": "textplain",
};

const parseLanguage = (lang) => mappings[lang] || lang;

const defaultComponents = {
  block: ({ language, ...restProps }) => (
    <Editor
      {...restProps}
      className={"code"}
      sandboxes={sandboxes}
      width={25}
      language={parseLanguage(language)}
    />
  ),
};

export const Markdown = ({ components, ...restProps }) => {
  const computed = useMemo(() => ({ ...defaultComponents, ...components }), [components]);
  return <ReactMarkdown components={computed} {...restProps} />;
};

export default styled(Markdown)`
  & .code {
    margin: 20px 0;
  }
  code {
    padding: 0.125rem 0.25rem;
    font-size: 0.9rem;
    /* color: #c7254e;
    background-color: #f9f2f4; */
    /* color: #c7254e; */
    background-color: rgba(242, 242, 242, 1);
    border-radius: 0.3rem;
    vertical-align: middle;
    font-family: Menlo, Monaco, Consolas, "Courier New", monospac;
  }
  a {
    color: #428bca;
    text-decoration: none;
    background: transparent;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    position: relative;
    a.anchor {
      right: 100%;
      position: absolute;
      opacity: 0;
      margin-right: 10px;
      cursor: pointer;
      transition: ${({ theme }) => theme.mixins.transition("opacity")}
    }
    &:hover a.anchor,
    a.anchor:hover {
      opacity: 1;
    }
  }
  img {
    max-width: 35%;
    vertical-align: middle;
    border: 0;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  /* *:target {
    display: block;
    position: relative;
    top: 60px;
    /* visibility: hidden; */
  } */
`;
