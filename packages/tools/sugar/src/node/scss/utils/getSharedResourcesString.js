"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sugar_1 = __importDefault(require("../../config/sugar"));
const isInPackage_1 = __importDefault(require("../../path/isInPackage"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const path_1 = __importDefault(require("path"));
const jsObjectToScssMap_1 = __importDefault(require("./jsObjectToScssMap"));
/**
 * @name            getScssSharedResourcesString
 * @namespace       sugar.node.scss.utils
 * @type            Function
 * @wip
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
function getScssSharedResourcesString(array = []) {
    if (!array || !array.length)
        array = sugar_1.default('scss.sharedResources');
    let importsStrings = '';
    array.forEach((importItem) => {
        if (typeof importItem === 'string') {
            if (importItem === 'sugar') {
                const settings = Object.assign({}, sugar_1.default('scss'));
                delete settings.compile;
                const settingsString = jsObjectToScssMap_1.default(settings);
                const path = isInPackage_1.default('coffeekraken', process.cwd(), true)
                    ? path_1.default.resolve(packageRoot_1.default(__dirname, true), 'packages/tools/sugar/index')
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
}
module.exports = getScssSharedResourcesString;
//# sourceMappingURL=getSharedResourcesString.js.map