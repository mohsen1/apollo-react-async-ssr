import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";

const [clientConfig] = require("../../webpack.config.js");

clientConfig.stats = "errors-only";

const compiler = webpack(clientConfig);
const devMiddleware = webpackDevMiddleware(compiler, {
  logLevel: "error",
  publicPath: clientConfig.output.publicPath,
  serverSideRender: true
});

export default devMiddleware;
