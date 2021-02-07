// @ts-nocheck

import __SConfig from './SConfig';
import __SConfigFolderAdapter from './adapters/SConfigFolderAdapter';
import __path from 'path';
import __packageRoot from '../path/packageRoot';
import __resolveTokens from '../object/resolveTokens';

/**
 * @name                  sugar
 * @namespace           sugar.node.config
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
 * import sugar from '@coffeekraken/sugar/node/config/sugar';
 * sugar('scss.unit'); // => rem
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let sugarConfigInstance;

function sugar(dotPath) {
  if (!sugarConfigInstance) {
    sugarConfigInstance = new __SConfig('sugar', {
      adapters: [
        new __SConfigFolderAdapter({
          name: 'sugar',
          foldername: '.sugar',
          filename: '[name].config.js',
          defaultConfigPath: __path.resolve(
            __dirname,
            '../../../.sugar-default'
          ),
          appConfigPath: `${__packageRoot(process.cwd())}/[foldername]`,
          userConfigPath: `${__packageRoot(process.cwd())}/.local/[foldername]`
        })
      ]
    });
  }
  // get the config
  return sugarConfigInstance.get(dotPath, undefined, {
    throwErrorOnUndefinedConfig: false
  });
}
export = sugar;
