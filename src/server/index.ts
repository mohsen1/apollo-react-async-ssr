import express from "express";
import path from "path";

import apolloServer from "./apollo-server";
import render from "./render";

const app = express();

app.use("/dist/client", express.static(path.resolve("./dist/client")));

apolloServer.applyMiddleware({ app, path: "/api" });

if (process.env.NODE_ENV === "development") {
  const devMiddleware = require("./devMiddleware").default;
  app.use(devMiddleware);
}

app.get("*", render);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started");
});
