import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";

import Html from "./components/Html";

const render: express.Handler = (req, res, next) => {
  const html = ReactDOMServer.renderToString(<Html req={req} />);
  res
    .status(200)
    .header("content-type", "text/html")
    .send(`<!doctype html>${html}`);
};

export default render;
