import {
  InMemoryCache,
  createHttpLink,
  ApolloClient,
} from "@apollo/client/core";

export function initializeApolloClient() {
  // HTTP connection to the API
  const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: import.meta.env.VITE_GRAPHQL_URI,
  });

  // Cache implementation
  const cache = new InMemoryCache();

  // Create the apollo client
  return new ApolloClient({
    link: httpLink,
    cache,
  });
}
