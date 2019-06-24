import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import Loadable from "react-loadable";
import { getDataFromTree } from "react-apollo";
import { getBundles } from "react-loadable/webpack";
import Helmet from "react-helmet";
import { StaticContext } from "react-router";

import Html from "./components/Html";
import ServerAppContents from "./components/ServerAppContents";
import getApolloClient from "./getApolloClient";

/**
 * @todo Make this shit work
 */
const render: express.Handler = async (req, res, next) => {
  try {
    const loadableStats = require("../../dist/client/react-loadable.json");
    const webpackManifest = require("../../dist/client/webpack-manifest.json");
    const sheet = new ServerStyleSheet();
    const modules = [];
    const apolloClient = getApolloClient();
    const routerContext: StaticContext = {};

    const contentsTree = (
      <ServerAppContents
        req={req}
        client={apolloClient}
        reportModules={module => modules.push(module)}
        routerContext={routerContext}
      />
    );

    await Loadable.preloadAll();
    await getDataFromTree(contentsTree);
    const appContents = ReactDOMServer.renderToString(
      sheet.collectStyles(contentsTree)
    );
    const initialState = apolloClient.extract();
    const styleTags = sheet.getStyleElement();
    const helmet = Helmet.renderStatic();
    const bundles = getBundles(loadableStats, modules);

    const html = ReactDOMServer.renderToString(
      <Html
        {...{
          styleTags,
          initialState,
          webpackManifest,
          bundles,
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
