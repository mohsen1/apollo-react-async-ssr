import React from "react";
import express from "express";

import Head from "./Head";
import Body from "./Body";
import { ApolloProvider } from "react-apollo";

import getApolloClient from "../getApolloClient";

const Html: React.FC<{ req: express.Request }> = ({ req }) => {
  return (
    <ApolloProvider client={getApolloClient()}>
      <html>
        <Head />
        <Body />
      </html>
    </ApolloProvider>
  );
};

export default Html;
