const glob = require('glob');
const path = require('path');

const rawEntries = glob.sync("./src/js/**/*.bundle.js");
const entries = {};
rawEntries.forEach(entry => {
  entries[entry.split('/').slice(-1)[0]] = entry;
});

module.exports = {
  entry: entries,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'import-glob',
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      }
    ]
  },
  output: {
    path: path.resolve('./dist/js'),
    filename: "[name]"
  },
  mode: "production"
};
