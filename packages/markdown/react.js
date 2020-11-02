import { createElement } from "react";
import unified from "unified";
// Remark
import markdown from "remark-parse";
import gfm from "remark-gfm";
import emoji from "remark-gemoji";
import slug from "remark-slug";
import toc from "remark-toc";
import custom from "remark-heading-id";
import github from "remark-github";
// remark-first-heading
import codeblocks from "remark-code-blocks";
import remark2rehype from "remark-rehype";
import footnotes from "remark-footnotes";
import frontmatter from "remark-frontmatter";
import math from "remark-math";
// Rehype
import embed from "./plugins/rehype-embed";
import headings from "rehype-autolink-headings";
import a11Emojis from "rehype-accessible-emojis";
import katex from "rehype-katex";
// import sanitize from "rehype-sanitize";
import raw from "rehype-raw";
import rehype2react from "rehype-react";
import format from "rehype-format";
import html from "rehype-stringify";
// Components
import Icon from "./Icon";

// var gh = require("hast-util-sanitize/lib/github");
// console.log(gh);

export const createRemarkRehypeParser = () =>
  unified()
    .use(markdown, { fragment: true })
    .use(gfm)
    .use(emoji)
    .use(math)
    .use(frontmatter)
    .use(footnotes, { inlineNotes: true })
    .use(custom)
    .use(slug)
    .use(toc)
    .use(github, { repository: "rehypejs/rehype-react" })
    .use(codeblocks)
    .use(remark2rehype)
    .use(a11Emojis)
    .use(katex)
    .use(embed)
    .use(headings, {
      properties: {
        ariaHidden: true,
        tabIndex: -1,
        className: "anchor",
      },
    })
    // Ensure html format
    .use(raw);
// .use(sanitize, gh);

export const createCodeBlock = (Code, Block) => ({ node: { tagName }, ...props }) => {
  const { className } = props;
  const Component = Code || tagName;
  const [, lang] = /language-([\w]+)/.exec(className) || [];

  if (lang) {
    return <Block {...props} language={lang} />;
  }

  return <Component {...props} />;
};

export const createSpanIcon = (Span, Icon) => ({ node: { tagName }, ...props }) => {
  const { className } = props;
  const Component = Span || tagName;
  const [, icon] = /icon-([\w]+)/.exec(className) || [];

  if (icon) {
    return <Icon {...props} icon={icon} />;
  }

  return <Component {...props} />;
};

export const parseMarkdownReact = (source, options) => {
  const { components: { span, icon = Icon, block, code, ...restComponents } = {} } = { ...options };
  const components = restComponents;
  if (code || block) {
    components.code = block ? createCodeBlock(code, block) : code;
  }

  if (span || icon) {
    components.span = block ? createSpanIcon(span, icon) : span;
  }
  return createRemarkRehypeParser()
    .use(rehype2react, {
      passNode: true,
      createElement,
      components,
    })
    .processSync(source).result;
};

export const parseMarkdownHtml = (source) =>
  createRemarkRehypeParser().use(format).use(html).processSync(source).toString();

export const ReactMarkdown = ({ children, components, ...restProps }) => (
  <div {...restProps}>{parseMarkdownReact(children, { components })}</div>
);

export default ReactMarkdown;
