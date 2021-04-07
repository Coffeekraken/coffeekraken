import __SConfig from '@coffeekraken/s-config';
import __isNode from '../is/node';
import __packageRoot from '../path/packageRoot';
import __registerFolder from './registerFolder';

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
// @ts-ignore
(global ?? window)._registeredConfigFolderPaths = [];
let sugarConfigInstance;
let _sugarJsons;
export default function sugar(dotPath) {
  if (__isNode()) {
    if (!_sugarJsons) {
      const sugarJson = require('../../node/sugar/sugarJson').default;
      const __path = require('path');
      _sugarJsons = sugarJson('*');
      Object.keys(_sugarJsons).forEach((packageName) => {
        const jsonObj = _sugarJsons[packageName];
        if (jsonObj.config && jsonObj.config.folders) {
          jsonObj.config.folders.forEach((folderObj) => {
            __registerFolder(
              __path.resolve(jsonObj.metas.folderPath, folderObj.path),
              folderObj.level
            );
          });
        }
      });
    }

    if (!sugarConfigInstance) {
      const __path = require('path'); // eslint-disable-line
      const { SConfigFolderAdapter } = require('@coffeekraken/s-config'); // eslint-disable-line
      sugarConfigInstance = new __SConfig('sugar', {
        adapters: [
          new SConfigFolderAdapter({
            configAdapter: {
              name: 'sugar'
            },
            configFolderAdapter: {
              folderName: '.sugar',
              fileName: '[name].config.js',
              defaultConfigPath: [
                __path.resolve(__dirname, '../../config'),
                // @ts-ignore
                ...(global ?? window)._registeredConfigFolderPaths
                  .filter((obj) => obj.level === 'default')
                  .map((obj) => obj.path)
              ],
              appConfigPath: [
                `${__packageRoot(process.cwd())}/[folderName]`,
                // @ts-ignore
                ...(global ?? window)._registeredConfigFolderPaths
                  .filter((obj) => obj.level === 'app')
                  .map((obj) => obj.path)
              ],
              userConfigPath: [
                `${__packageRoot(process.cwd())}/.local/[folderName]`,
                // @ts-ignore
                ...(global ?? window)._registeredConfigFolderPaths
                  .filter((obj) => obj.level === 'user')
                  .map((obj) => obj.path)
              ]
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
