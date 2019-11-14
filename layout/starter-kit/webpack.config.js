module.exports = {
  entry: "./src/js/app.js",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      }
    ]
  },
  output: {
    path: __dirname + "/dist/js",
    filename: "app.js"
  },
  mode: "production"
};
