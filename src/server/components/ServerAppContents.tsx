import React from "react";
import express from "express";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-client";
import { StaticRouter, StaticContext } from "react-router";
import Loadable from "react-loadable";

import App from "../../components/App";

/** Generates the contents of the root div in server */
const ServerAppContents: React.FC<{
  req: express.Request;
  client: InstanceType<typeof ApolloClient>;
  reportModules: (module: string) => void;
  routerContext: StaticContext;
}> = ({ req, client, reportModules, routerContext }) => {
  return (
    <Loadable.Capture report={reportModules}>
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={routerContext}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    </Loadable.Capture>
  );
};

export default ServerAppContents;
