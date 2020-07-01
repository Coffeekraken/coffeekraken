const __sugarConfig = require('../../config/sugar');
const __isInPackage = require('../../path/isInPackage');
const __packageRoot = require('../../path/packageRoot');
const __path = require('path');

/**
 * @name            getImportsArray
 * @namespace       node.build.scss
 * @type            Function
 *
 * This function simply check the @config.build.scss.imports config and return the correct imports array
 *
 * @param       {Array}        [array=null]        Specify the imports array you want to use, otherwise will take the default config in build.scss.imports
 * @return      {String}                            The string representing the imports
 *
 * @since       2.0.0
 */
module.exports = function getImportsArray(array = null) {
  if (!array) array = __sugarConfig('build.scss.imports');

  let importsString = '';

  array.forEach((importItem) => {
    if (typeof importItem === 'string') {
      if (importItem === 'sugar') {
        const path = __isInPackage('coffeekraken', process.cwd(), true)
          ? __path.resolve(__packageRoot(__dirname, true), 'util/sugar/index')
          : '@coffeekraken/sugar/index';
        importsString += `
          @use "${path}" as Sugar;
          @include Sugar.setup($sugarUserSettings);
          @include Sugar.init();
        `;
      }
    }
  });

  return importsString;
};
