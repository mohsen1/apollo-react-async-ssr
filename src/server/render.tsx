import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import cheerio from "cheerio";
import { ServerStyleSheet } from "styled-components";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";

import Html from "./components/Html";

/**
 * @todo Make this shit work
 */
const render: express.Handler = async (req, res, next) => {
  try {
    const loadableStats = require("../../dist/client/react-loadable.json");
    const webpackManifest = require("../../dist/client/webpack-manifest.json");
    const sheet = new ServerStyleSheet();
    const modules = [];

    await Loadable.preloadAll();
    const html = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <Html req={req} />
        </Loadable.Capture>
      )
    );
    const $ = cheerio.load(`<!doctype html>${html}`);
    const styleTags = sheet.getStyleTags();
    const bundles = getBundles(loadableStats, modules);

    $("head").append(styleTags);
    $("body").append(
      `<script src="${webpackManifest["vendors~main.js"]}"></script>`
    );
    $("body").append(`<script src="${webpackManifest["main.js"]}"></script>`);
    $("body").append(
      bundles
        .filter(Boolean)
        .filter(({ file }) => !file.endsWith(".map"))
        .map(({ publicPath }) => `<script src="${publicPath}"></script>`)
        .join("")
    );

    res
      .status(200)
      .header("content-type", "text/html")
      .send($.html());
  } catch (e) {
    next(e);
  }
};

export default render;
