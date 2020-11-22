"use strict";
const __sugarConfig = require('../config/sugar');
const __isInPackage = require('../path/isInPackage');
const __packageRoot = require('../path/packageRoot');
const __path = require('path');
const __jsObjectToScssMap = require('./jsObjectToScssMap');
/**
 * @name            getScssSharedResourcesString
 * @namespace       sugar.node.scss
 * @type            Function
 *
 * This function simply check the @config.build.scss.imports config and return the correct imports array
 *
 * @param       {Array}        [array=null]        Specify the imports array you want to use, otherwise will take the default config in build.scss.imports
 * @return      {Object}                           An object containing two strings. The first is "prepend" and the second "append" depending on where we have to add the imports string in the code
 *
 * @since       2.0.0
 */
module.exports = function getScssSharedResourcesString(array = null) {
    if (!array)
        array = __sugarConfig('scss.sharedResources');
    let importsStrings = '';
    array.forEach((importItem) => {
        if (typeof importItem === 'string') {
            if (importItem === 'sugar') {
                const settings = __sugarConfig('scss');
                const settingsString = __jsObjectToScssMap(settings);
                const path = __isInPackage('coffeekraken', process.cwd(), true)
                    ? __path.resolve(__packageRoot(__dirname, true), 'toolkits/sugar/index')
                    : '@coffeekraken/sugar/index';
                importsStrings += `
          @use "${path}" as Sugar;
          $sugarUserSettings: ${settingsString};
          @include Sugar.setup($sugarUserSettings);
        `;
            }
            else {
                importsStrings += `
          ${importItem}
        `;
            }
        }
    });
    return importsStrings;
};
