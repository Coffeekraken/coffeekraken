const __SConfig = require('./SConfig');
const __SConfigFsAdapter = require('./adapters/SConfigFsAdapter');
const __path = require('path');
const __packageRoot = require('../path/packageRoot');

/**
 * @name                  sugar
 * @namespace             sugar.node.config
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
module.exports = async function sugar(dotPath) {
  if (!sugarConfigInstance) {
    sugarConfigInstance = await new __SConfig('sugar', {
      adapters: [
        new __SConfigFsAdapter({
          name: 'sugar',
          filename: '[name].config.js',
          defaultConfigPath: __path.resolve(
            __dirname,
            '../../../sugar.config.default.js'
          ),
          appConfigPath: `${__packageRoot(process.cwd())}/[filename]`,
          userConfigPath: null
        })
      ]
    });
  }
  // get the config
  return sugarConfigInstance.get(dotPath);
};
