/** @typedef {import('@apollo/client').DocumentNode} DocumentNode */
/** @typedef {import('@apollo/client').TypedDocumentNode} TypedDocumentNode */
/** @typedef {import('@apollo/client').QueryHookOptions} QueryHookOptions */

import { useQuery as useApolloQuery } from "@apollo/client";

const suspendQuery = (promise) => {
  let status = "pending";
  let response;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };
  const result = { read };

  return result;
};

/**
 * @typedef {Object} CustomQueryHookOptions
 * @prop {Boolean} suspend enables react supense mode
 */

/**
 * @param {DocumentNode|TypedDocumentNode} query
 * @param {CustomQueryHookOptions & QueryHookOptions} options
 */
const useQuery = (query, { suspend = true, ...restOptions }) => {
  const result = useApolloQuery(query, restOptions);
  if (suspend && result.loading) {
    suspendQuery(new Promise((resolve) => !result.loading && resolve())).read();
  }
  return result;
};

export default useQuery;

// references:
// https://github.com/apollographql/apollo-feature-requests/issues/162
