"use strict";

var __sugarConfig = require('../../config/sugar');

var __isInPackage = require('../../path/isInPackage');

var __packageRoot = require('../../path/packageRoot');

var __path = require('path');
/**
 * @name            getScssImportsStrings
 * @namespace       node.build.scss
 * @type            Function
 *
 * This function simply check the @config.build.scss.imports config and return the correct imports array
 *
 * @param       {Array}        [array=null]        Specify the imports array you want to use, otherwise will take the default config in build.scss.imports
 * @return      {Object}                           An object containing two strings. The first is "prepend" and the second "append" depending on where we have to add the imports string in the code
 *
 * @since       2.0.0
 */


module.exports = function getScssImportsStrings(array) {
  if (array === void 0) {
    array = null;
  }

  if (!array) array = __sugarConfig('build.scss.imports');
  var importsStrings = {
    prepend: '',
    append: ''
  };
  array.forEach(importItem => {
    if (typeof importItem === 'string') {
      if (importItem === 'sugar') {
        var path = __isInPackage('coffeekraken', process.cwd(), true) ? __path.resolve(__packageRoot(__dirname, true), 'toolkits/sugar/index') : '@coffeekraken/sugar/index';
        importsStrings.prepend += "\n          @use \"".concat(path, "\" as Sugar;\n          @include Sugar.setup($sugarUserSettings);\n          @include Sugar.init();\n        ");
        importsStrings.append += "";
      }
    }
  });
  return importsStrings;
};