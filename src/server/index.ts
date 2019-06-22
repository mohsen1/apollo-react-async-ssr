import apolloServer from "./apollo-server";

apolloServer.listen(3000).then(() => {
  console.log("Server has started");
});
