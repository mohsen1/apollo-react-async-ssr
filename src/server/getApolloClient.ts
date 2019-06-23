import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SchemaLink } from "apollo-link-schema";

import { schema } from "./apollo-server";

function getApolloClient() {
  /** Server apollo client */
  const apolloClient = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema })
  });

  return apolloClient;
}

export default getApolloClient;
