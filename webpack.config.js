// @ts-check
const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const { ReactLoadablePlugin } = require("react-loadable/webpack");
const mkdirp = require("mkdirp");
const ManifestPlugin = require("webpack-manifest-plugin");

// ReactLoadablePlugin can't make deep directories
mkdirp.sync("./dist/client");

const isEnvProduction = process.env.NODE_ENV === "production";

/** publicPath across all configs. */
const publicPath = "/dist/client/";

/** @type {import("webpack").Rule} */
const mjsRule = {
  // fixes https://github.com/graphql/graphql-js/issues/1272
  test: /\.mjs$/,
  include: /node_modules/,
  type: "javascript/auto"
};

/** @type {import("webpack").Rule} */
const babelRule = {
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  loader: "babel-loader",
  exclude: /node_modules/,
  options: {
    cacheDirectory: true,
    cacheCompression: isEnvProduction,
    compact: isEnvProduction,
    plugins: [
      [
        require.resolve("babel-plugin-named-asset-import"),
        {
          loaderMap: {
            svg: { ReactComponent: "@svgr/webpack?-svgo,+ref![path]" }
          }
        }
      ],
      require.resolve("babel-plugin-styled-components"),
      require.resolve("react-loadable/babel")
    ],
    presets: [["react-app", { flow: false, typescript: true }]],
    sourceType: "unambiguous"
  }
};

/** @type {import("webpack").Rule} */
const fileRule = {
  loader: "file-loader",
  exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
  options: {
    name: "static/media/[name].[hash:8].[ext]"
  }
};

/** @type {import("webpack").Configuration['optimization']} */
const clientOptimization = {
  splitChunks: {
    chunks: "all",
    name: true
  }
};

/** @type {import("webpack").Resolve} */
const resolve = {
  modules: ["node_modules", path.resolve("src")],
  extensions: [".js", ".mjs", ".ts", ".jsx", ".tsx", ".css", ".gql", ".graphql"]
};

/** @type {import("webpack").Stats.ToStringOptionsObject} */
const stats = { warnings: isEnvProduction };

/** @type {import("webpack").Configuration} */
const serverConfig = {
  name: "server",
  mode: isEnvProduction ? "production" : "development",
  target: "node",
  devtool: "source-map",
  stats,
  resolve,
  optimization: { minimize: false },
  externals: [
    /react-loadable\.json$/,
    /webpack-manifest\.json$/,
    nodeExternals()
  ],
  entry: path.resolve(__dirname, "./src/server/index.ts"),
  output: {
    path: path.resolve(__dirname, "./dist/server"),
    filename: "index.js",
    library: "renderer",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [mjsRule, { oneOf: [babelRule] }]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.WEBPACK_TARGET": JSON.stringify("node")
    })
  ]
};

/** @type {import("webpack").Configuration} */
const clientConfig = {
  name: "client",
  mode: isEnvProduction ? "production" : "development",
  target: "web",
  devtool: "source-map",
  resolve,
  optimization: clientOptimization,
  entry: "./src/client/index.tsx",
  output: {
    path: path.resolve(__dirname, "./dist/client"),
    publicPath,
    filename: "[name]-[chunkhash:6].js"
  },
  module: {
    rules: [mjsRule, { oneOf: [babelRule, fileRule] }]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.WEBPACK_TARGET": JSON.stringify("web"),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new ReactLoadablePlugin({
      filename: "./dist/client/react-loadable.json"
    }),
    new ManifestPlugin({
      fileName: "webpack-manifest.json",
      publicPath
    })
  ]
};

module.exports = [clientConfig, serverConfig];
