const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const webpackConfig = require("./webpack.config");
const _merge = require("lodash/merge");

module.exports = _merge(webpackConfig, {
  plugins: [
    ...(webpackConfig.plugins || []),
    new BundleAnalyzerPlugin({
      openAnalyzer: true
    })
  ]
});
