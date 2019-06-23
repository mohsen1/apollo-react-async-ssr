import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

/** Client Apollo Client */
const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: "/api"
  }),
  ssrForceFetchDelay: 100,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
});

export default apolloClient;
