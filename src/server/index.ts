import express from "express";

import apolloServer from "./apollo-server";
import devMiddleware from "./devMiddleware";
import render from "./render";

const app = express();

app.use(express.static("../../dist/client"));

apolloServer.applyMiddleware({ app, path: "/api" });

if (process.env.NODE_ENV === "development") {
  app.use(devMiddleware);
} //

app.get("*", render);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started");
});
