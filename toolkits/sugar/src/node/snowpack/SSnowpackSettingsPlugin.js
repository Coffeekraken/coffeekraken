// my-snowpack-plugin.js
const __fs = require('fs');
const __sugarConfig = require('../config/sugar');
const __jsonToMap = require('../scss/jsObjectToScssMap');

module.exports = function (snowpackConfig, pluginOptions) {
  return {
    name: 'SSnowpackSettingsPlugin',
    async transform({ id, contents, isDev, fileExt }) {
      console.log(id, fileExt);
      const content = __fs.readFileSync(filePath, 'utf8');
      const config = __sugarConfig('scss');
      const configString = __jsonToMap(config);
      return `
        @use "@coffeekraken/sugar/index" as Sugar;
        $sugarUserSettings: ${configString};
        @include Sugar.setup($sugarUserSettings);
        ${content}
      `;
    }
    // resolve: {
    //   input: ['.scss'],
    //   output: ['.scss']
    // },
    // async load({ filePath }) {

    //   return filePath;
    // }
  };
};
