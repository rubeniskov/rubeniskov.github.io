import useQuery from "../hooks/useQuery";
import gql from "graphql-tag";

// const GET_CART_ITEMS = gql`
//   query GetAllPosts {
//     posts @client
//   }
// `;

const GET_CART_ITEMS = gql`
  query GetAllPosts {
    posts @rest(type: "[Post]", path: "") {
      url
      title
    }
  }
`;

const GetPosts = () => {
  const { data, ...restResult } = useQuery(GET_CART_ITEMS, {
    suspend: true,
  });
  console.log(data, restResult);

  return {
    data: data && data.posts,
    ...restResult,
  };
};

export default GetPosts;
