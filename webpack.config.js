const path = require("path");
module.exports = {
  mode: "development",
  entry: {
    "./demo/dist/js/app.js": "./demo/src/js/app.js"
  },
  output: {
    path: require("path").resolve("."),
    filename: "[name]"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      }
    ]
  }
};
