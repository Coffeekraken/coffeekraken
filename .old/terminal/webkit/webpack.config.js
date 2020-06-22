const __path = require("path");
const __glob = require('glob');
const __findUp = require('find-up');
const __fs = require('fs');
const __config = require('./bin/commands/config');

let localPackageJson = {};
if (__fs.existsSync(`${process.cwd()}/package.json`)) {
  localPackageJson = require(`${process.cwd()}/package.json`);
}
let localWebpackConfig = {};
if (__fs.existsSync(`${process.cwd()}/webpack.config.js`)) {
  localWebpackConfig = require(`${process.cwd()}/webpack.config.js`);
}

const globStringSrc = __config.dist.js.bundle.sourceFilesPattern;
const rawSrcEntries = __glob.sync(globStringSrc);
const srcEntries = {};
rawSrcEntries.forEach(entry => {
  srcEntries[entry.split('/').slice(-1)] = entry;
});

const settings = {
  mode: 'production',
  entry: srcEntries,
  output: {
    path: __path.resolve(__config.dist.js.bundle.outputFolder),
    filename: '[name]'
  },
  resolve: {
    modules: [__path.resolve(__dirname, 'node_modules'), 'node_modules']
  },
  resolveLoader: {
    modules: [__path.resolve(__dirname, 'node_modules'), 'node_modules'],
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main']
  },
  module: {
    rules: [{
      test: /\.js/,
      enforce: 'pre',
      use: {
        loader: 'import-glob'
      }
    }, {
      test: /\.scss/,
      enforce: 'pre',
      use: {
        loader: 'import-glob'
      }
    }, {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  }
};

module.exports = settings;
