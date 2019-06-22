import React from "react";
import express from "express";

import Head from "./Head";
import Body from "./Body";

const Html: React.FC<{ req: express.Request }> = ({ req }) => (
  <html>
    <Head />
    <Body />
  </html>
);

export default Html;
