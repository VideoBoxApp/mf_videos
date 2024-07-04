const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const Dotenv = require("dotenv-webpack");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/app.ts",
  output: {
    filename: "remoteEntry.js",
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 9001,
    hot: true,
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "mfVideos",
      filename: "dist/remoteEntry.js",
      remotes: {
        mfDrawer: "mfDrawer@http://localhost:9000/dist/remoteEntry.js",
      },
      exposes: {
        "./mfVideos": "./src/pages/Videos.ts",
        "./Favorites": "./src/pages/Favorites.ts",
      },
    }),
    new Dotenv({
      path: "./.env",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
    }),
  ],
};
