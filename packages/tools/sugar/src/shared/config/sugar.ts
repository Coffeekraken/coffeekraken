import __SConfig from '@coffeekraken/s-config';
import __isNode from '../is/node';
import __packageRoot from '../path/packageRoot';

/**
 * @name                  sugar
 * @namespace           sugar.shared.config
 * @type                  Function
 * @status              beta
 *
 * This function allows you to access easily the configurations stored in the ```sugar.config.js```.
 * The returned configuration is the result of the default sugar config stored in the toolkit and the
 * app defined config stored in current application root folder
 *
 * @param         {String}        dotPath         The dot path to the config wanted
 * @return        {Mixed}                         Return the value if exists, undefined if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      {Enhancement}       Find a way to specify the "userConfigPath" dynamically without having circular dependencies
 *
 * @example             js
 * import sugar from '@coffeekraken/sugar/shared/config/sugar';
 * sugar('scss.unit'); // => rem
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let sugarConfigInstance;
export default function sugar(dotPath) {
  if (__isNode()) {
    if (!sugarConfigInstance) {
      const __path = require('path'); // eslint-disable-line
      const __SConfigFolderAdapter = require('../../node/config/adapters/SConfigFolderAdapter') // eslint-disable-line
        .default;
      sugarConfigInstance = new __SConfig('sugar', {
        adapters: [
          new __SConfigFolderAdapter({
            configAdapter: {
              name: 'sugar'
            },
            configFolderAdapter: {
              folderName: '.sugar',
              fileName: '[name].config.js',
              defaultConfigPath: __path.resolve(__dirname, '../../config'),
              appConfigPath: `${__packageRoot(process.cwd())}/[foldername]`,
              userConfigPath: `${__packageRoot(
                process.cwd()
              )}/.local/[foldername]`
            }
          })
        ]
      });
    }
    // get the config
    return sugarConfigInstance.get(dotPath, undefined, {
      throwErrorOnUndefinedConfig: false
    });
  }
}
