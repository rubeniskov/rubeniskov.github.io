import Markdown from "@rubeniskov/markdown";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { urlResolve } from "../utils";
import useFetch from "../hooks/useFetch";
import BasicLayout from "../layouts/Basic";
import Link from "./Link";
import usePosts from "../resources/posts";
import { Suspense } from "react";

const links = {
  en: [
    {
      id: "finally-i-made-my-website",
      title: "Finally I made my website",
    },
    {
      id: "shader-sandbox",
      title: "Shader sandbox",
    },
    {
      id: "shader-sandbox-glslify",
      title: "Shader sandbox glslify",
    },
  ],
  es: [
    {
      id: "al-fin-termine-mi-pagina",
      title: "Al fin terminé mi página",
    },
  ],
};

const BlogPost = () => {
  const match = useRouteMatch();
  const { id, lang } = match.params;
  const { loading, error, data } = useFetch(`/blog/${lang}/${id}.md`);

  if (loading) {
    return "loading";
  }

  if (!id && error) {
    return <div>Ups missing post</div>;
  }

  return <Markdown>{data}</Markdown>;
};

const BlogLinks = () => {
  const { data } = usePosts();
  return (
    <ul>
      {data.map(({ url, title }) => (
        <li key={url}>
          <Link to={url}>{title}</Link>
        </li>
      ))}
    </ul>
  );
};
const Blog = () => {
  const match = useRouteMatch();
  return (
    <BasicLayout>
      <Switch>
        <Route exact path={urlResolve(match.path)}>
          <Suspense fallback={"loading"}>
            <BlogLinks />
          </Suspense>
        </Route>
        <Route path={urlResolve(match.path, ":lang", ":id")}>
          <BlogPost />
        </Route>
      </Switch>
    </BasicLayout>
  );
};

export default Blog;
