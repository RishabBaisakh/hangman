var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: ["@babel/polyfill", "./js/app.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/build",
    filename: "app.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"],
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
  },
};
