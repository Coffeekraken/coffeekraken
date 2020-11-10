const { plugin } = require('./plugin-resolve-alias');
//
module.exports = function (snowpackConfig, pluginOptions) {
  return {
    name: 'SSnowpackResolveAliasPlugin',
    async transform({ id: srcFilename, contents: srcContent, fileExt }) {
      if (
        fileExt === '.js' ||
        fileExt === '.jsx' ||
        fileExt === '.ts' ||
        fileExt === '.tsx'
      ) {
        return plugin({
          srcFilename,
          srcContent,
          alias: snowpackConfig.alias
        });
      }
    }
  };
};
