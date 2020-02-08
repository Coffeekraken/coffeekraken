const projectPackageJson = require(process.cwd() + '/package.json');
const __path = require('path');

module.exports.default = {};
module.exports.default.loaders = {};
module.exports.default.webpack = {
  mode: 'production',
  entry: {},
  // context: __path.resolve(__dirname, '../../'),
  output: {
    filename: '[name]',
    pathinfo: false,
    path: process.cwd(),
    publicPath: '/app/js/',
    chunkFilename: `dist/js/chunks/[name]-[chunkhash]-${projectPackageJson.version}.js`
  },
  plugins: [],
  optimization: {
    minimize: true,
    minimizer: process.env.NODE_ENV === 'prod' ? [
      new __TerserPlugin({
        terserOptions: {}
      }
    )] : []
  },
  resolve: {
    alias: {
      '@squid': __path.resolve(__dirname, '../../src/js'),
      '@app': process.cwd() + '/dist/js',
      '@coffeekraken/sugar/js': __dirname + '/../../../../util/sugar/src/js',
      '@coffeekraken/sugar/node': __dirname + '/../../../../util/sugar/src/node'
    }
  },
  module: {
    rules: []
  }
};

module.exports.default.loaders.coffeeLoader = {
};
