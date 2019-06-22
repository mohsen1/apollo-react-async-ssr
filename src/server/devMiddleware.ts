import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";

const [clientConfig] = require("../../webpack.config.js");

clientConfig.stats = "errors-only";

const compiler = webpack(clientConfig);
const devMiddleware = webpackDevMiddleware(compiler, {
  logLevel: "error",
  publicPath: "/"
});

export default devMiddleware;
