// @ts-nocheck

import __sugarConfig from '../../config/sugar';
import __isInPackage from '../../path/isInPackage';
import __packageRoot from '../../path/packageRoot';
import __path from 'path';
import __jsObjectToScssMap from './jsObjectToScssMap';

/**
 * @name            getScssSharedResourcesString
 * @namespace       sugar.node.scss.utils
 * @type            Function
 * @status              wip
 *
 * This function simply check the @config.build.scss.imports config and return the correct imports array
 *
 * @param       {Array}        [array=null]        Specify the imports array you want to use, otherwise will take the default config in build.scss.imports
 * @return      {Object}                           An object containing two strings. The first is "prepend" and the second "append" depending on where we have to add the imports string in the code
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function getScssSharedResourcesString(array: string[] = []) {
  if (!array || !array.length) array = __sugarConfig('scss.sharedResources');

  let importsStrings = '';

  array.forEach((importItem) => {
    if (typeof importItem === 'string') {
      if (importItem === 'sugar') {
        const settings = Object.assign({}, __sugarConfig('scss'));
        delete settings.compile;
        const settingsString = __jsObjectToScssMap(settings);
        const path = __isInPackage('coffeekraken', process.cwd(), true)
          ? __path.resolve(
              __packageRoot(__dirname, true),
              'packages/tools/sugar/index'
            )
          : '@coffeekraken/sugar/index';
        importsStrings += `
          @use "${path}" as Sugar;
          $sugarUserSettings: ${settingsString};
          @include Sugar.setup($sugarUserSettings);
        `;
      } else {
        importsStrings += `
          ${importItem}
        `;
      }
    }
  });

  return importsStrings;
}
export default getScssSharedResourcesString;
