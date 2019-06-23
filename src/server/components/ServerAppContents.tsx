import React from "react";
import express from "express";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-client";
import { StaticRouter } from "react-router";
import Loadable from "react-loadable";

import App from "../../components/App";

/** Generates the contents of the root div in server */
const ServerAppContents: React.FC<{
  req: express.Request;
  client: InstanceType<typeof ApolloClient>;
  reportModules: (module: string) => void;
}> = ({ req, client, reportModules }) => {
  return (
    <Loadable.Capture report={reportModules}>
      <ApolloProvider client={client}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    </Loadable.Capture>
  );
};

export default ServerAppContents;
