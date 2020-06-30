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
 * @param       {String}        [format="array"]        Specify the format you want back. Can be "array" or "string"
 * @return      {Array}             An array of import object depending on the global config
 *
 * @since       2.0.0
 */
module.exports = function getImportsArray(format = 'array') {
  const imports = __sugarConfig('build.scss.import');

  const importsArray = [];
  let importsString = '';
  console.log('IMPORT');

  if (imports.sugar) {
    importsArray.push({
      name: 'Sugar',
      path: __isInPackage('@coffeekraken/sugar')
        ? __path.resolve(__packageRoot(__dirname), 'index')
        : '@coffeekraken/sugar/index',
      scss: `
        @include Sugar.setup($sugarUserSettings);
        @include Sugar.init();
      `
    });
  }

  importsArray.forEach((obj) => {
    importsString += `
      @use "${obj.path}" as ${obj.name};
      ${obj.scss ? obj.scss : ''}
    `;
  });

  if (format.toLowerCase() === 'string') return importsString;
  return importsArray;
};
