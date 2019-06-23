import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

/** Client Apollo Client */
const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: "/api"
  }),
  cache: new InMemoryCache()
});

export default apolloClient;
