import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export function initializeApollo(initialState = null) {
  const client = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URI
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  });

  return client;
}
