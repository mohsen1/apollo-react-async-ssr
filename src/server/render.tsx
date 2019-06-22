import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import cheerio from "cheerio";
import { ServerStyleSheet } from "styled-components";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";

const loadableStats = require("../../dist/client/react-loadable.json");

import Html from "./components/Html";

const render: express.Handler = async (req, res, next) => {
  await Loadable.preloadAll();
  const sheet = new ServerStyleSheet();
  const modules = [];
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
    bundles
      .map(({ file }) => `<script src="/dist/client/${file}"></script>`)
      .join("")
  );

  res
    .status(200)
    .header("content-type", "text/html")
    .send($.html());
};

export default render;
