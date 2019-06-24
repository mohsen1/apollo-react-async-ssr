import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { getDataFromTree } from "react-apollo";
import Helmet from "react-helmet";
import { StaticContext } from "react-router";
import { ChunkExtractor } from "@loadable/server";

import Html from "./components/Html";
import ServerAppContents from "./components/ServerAppContents";
import getApolloClient from "./getApolloClient";

/**
 * @todo Make this shit work
 */
const render: express.Handler = async (req, res, next) => {
  try {
    const statsFile = "./dist/client/loadable-stats.json";
    const chunkExtractor = new ChunkExtractor({ statsFile });
    const sheet = new ServerStyleSheet();
    const apolloClient = getApolloClient();
    const routerContext: StaticContext = {};

    const contentsTree = (
      <ServerAppContents
        req={req}
        client={apolloClient}
        routerContext={routerContext}
      />
    );

    await getDataFromTree(contentsTree);
    const appContents = ReactDOMServer.renderToString(
      sheet.collectStyles(chunkExtractor.collectChunks(contentsTree))
    );
    const initialState = apolloClient.extract();
    const styleTags = sheet.getStyleElement();
    const helmet = Helmet.renderStatic();

    const html = ReactDOMServer.renderToString(
      <Html
        {...{
          styleTags,
          initialState,
          chunkExtractor,
          appContents,
          helmet
        }}
      />
    );

    if (routerContext.statusCode) {
      res.status(routerContext.statusCode);
    } else {
      res.status(200);
    }

    res.header("content-type", "text/html").send(`<!doctype html>${html}`);
  } catch (e) {
    next(e);
  }
};

export default render;
