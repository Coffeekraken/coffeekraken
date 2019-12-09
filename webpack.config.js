const path = require("path");
const glob = require('glob');

const globStringSrc = './src/js/**/*.bundle.js';
const globStringDemo = './demo/src/js/**/*.bundle.js';
const rawSrcEntries = glob.sync(globStringSrc);
const rawDemoEntries = glob.sync(globStringDemo);
const srcEntries = {};
const demoEntries = {};
rawSrcEntries.forEach(entry => {
  srcEntries[entry.split('/').slice(-1)[0]] = entry;
});
rawDemoEntries.forEach(entry => {
  demoEntries[entry.split('/').slice(-1)[0]] = entry;
});

module.exports = env => ({
  // mode: "production",
  entry: env.script === 'dist.js.bundle' ? srcEntries : demoEntries,
  output: {
    path: env.script === 'demo.dist.js.bundle' ? path.resolve('./demo/dist/js') : path.resolve('./dist/js'),
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
});
