const path = require("path");
module.exports = {
  mode: "production",
  entry: {
    "./demo/dist/js/app.js": "./demo/src/js/app.js"
  },
  output: {
    path: require("path").resolve("."),
    filename: "[name]"
  },
  resolve: {
    alias: {
      // '@coffeekraken/sugar': path.resolve(__dirname, 'util/sugar/dist')
    }
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
