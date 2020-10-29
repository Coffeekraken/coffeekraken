// my-snowpack-plugin.js
const __fs = require('fs');
const __sugarConfig = require('@coffeekraken/sugar/src/node/config/sugar');
const __jsonToMap = require('@coffeekraken/sugar/src/node/scss/jsObjectToScssMap');
module.exports = function (snowpackConfig, pluginOptions) {
  return {
    name: 'sugar-settings',
    // resolve: {
    //   input: ['.scss'],
    //   output: ['.scss']
    // },
    async transform({ id, contents, isDev, fileExt }) {
      if (fileExt === '.css') {
        const config = __sugarConfig('scss');
        const configString = __jsonToMap(config);
        return `
            @use "@coffeekraken/sugar/index" as Sugar;
            $sugarUserSettings: ${configString};
            @include Sugar.setup($sugarUserSettings);
            ${contents}
        `;
      }
    }
    // async load({ filePath }) {
    //   const content = __fs.readFileSync(filePath, 'utf8');
    //   return `
    //     coco
    //     ${content}
    //   `;
    //   return filePath;
    // }
  };
};
