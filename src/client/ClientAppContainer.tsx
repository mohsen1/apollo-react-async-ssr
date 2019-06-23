import React from "react";
import { ApolloProvider } from "react-apollo";

import apolloClient from "./apolloClient";

const ClientAppContainer: React.FC = ({ children }) => (
  <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
);

export default ClientAppContainer;
