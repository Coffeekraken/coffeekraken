const __SConfig = require('./SConfig');
const __SConfigFolderAdapter = require('./adapters/SConfigFolderAdapter');
const __path = require('path');
const __packageRoot = require('../path/packageRoot');
const __resolveTokens = require('../object/resolveTokens');

/**
 * @name                  sugar
 * @namespace           sugar.node.config
 * @type                  Function
 *
 * This function allows you to access easily the configurations stored in the ```sugar.config.js```.
 * The returned configuration is the result of the default sugar config stored in the toolkit and the
 * app defined config stored in current application root folder
 *
 * @param         {String}        dotPath         The dot path to the config wanted
 * @return        {Mixed}                         Return the value if exists, undefined if not
 *
 * @example             js
 * const sugar = require('@coffeekraken/sugar/node/config/sugar');
 * sugar('scss.unit'); // => rem
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let sugarConfigInstance;
module.exports = function sugar(dotPath) {
  if (!sugarConfigInstance) {
    sugarConfigInstance = new __SConfig('sugar', {
      adapters: [
        new __SConfigFolderAdapter({
          name: 'sugar',
          foldername: '.sugar',
          filename: '[name].config.js',
          defaultConfigPath: __path.resolve(__dirname, '../../../[foldername]'),
          appConfigPath: `${__packageRoot(process.cwd())}/[foldername]`,
          userConfigPath: null
        })
      ]
    });
  }
  // get the config
  return sugarConfigInstance.get(dotPath, undefined, {
    throwErrorOnUndefinedConfig: false
  });
};
