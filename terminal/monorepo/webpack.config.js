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

const generalPackageJsonPath = __findUp.sync('package.json', {
  cwd: __dirname
});
let generalPackageJson = {};
if (generalPackageJsonPath) {
  generalPackageJson = require(generalPackageJsonPath);
}

const generalWebpackConfigPath = __findUp.sync('webpack.config.js', {
  cwd: __dirname
});
let generalWebpackConfig = {};
if (generalWebpackConfigPath) {
  generalWebpackConfig = require(generalWebpackConfigPath);
}

const globStringSrc = __config.dist.js.bundle.sourceFilesPattern.replace('<rootDir>', process.env.ROOT_DIR || '').replace('//','/');
const rawSrcEntries = __glob.sync(globStringSrc);
const srcEntries = {};
rawSrcEntries.forEach(entry => {
  srcEntries[entry.split('/').slice(-1)] = entry;
});

const settings = {
  mode: 'production',
  entry: srcEntries,
  output: {
    path: __path.resolve(__config.dist.js.bundle.outputFolder.replace('<rootDir>', process.env.ROOT_DIR || '').replace('//','/')),
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
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

module.exports = settings;
