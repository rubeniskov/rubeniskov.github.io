import { ApolloProvider, ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "apollo-link-context";
import { RestLink } from "apollo-link-rest";

export const postsVar = makeVar([1, 2, 3, 4, 5]);

// setup your `RestLink` with your endpoint
const restLink = new RestLink({
  uri: process.env.MANIFEST_URL,
  responseTransformer: (response, outerType) =>
    response.json().then((data) => {
      switch (outerType) {
        case "[Post]":
          console.log(data);
          return data.blog.posts;
        default:
          return data;
      }
    }),
});

const cache = new InMemoryCache({
  // typePolicies: {
  //   Query: {
  //     fields: {
  //       posts: {
  //         read() {
  //           return postsVar();
  //         },
  //       },
  //     },
  //   },
  // },
});

const asyncAuthLink = setContext(
  (request) =>
    new Promise((success, fail) => {
      // do some async lookup here
      setTimeout(() => {
        success({ token: "async found token" });
      }, 10);
    })
);

const client = new ApolloClient({
  link: restLink,
  cache,
});

const StoreProvider = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default StoreProvider;
