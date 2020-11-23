"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../config/sugar"));
const isInPackage_1 = __importDefault(require("../path/isInPackage"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const path_1 = __importDefault(require("path"));
const jsObjectToScssMap_1 = __importDefault(require("./jsObjectToScssMap"));
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
function getScssSharedResourcesString(array = null) {
    if (!array)
        array = sugar_1.default('scss.sharedResources');
    let importsStrings = '';
    array.forEach((importItem) => {
        if (typeof importItem === 'string') {
            if (importItem === 'sugar') {
                const settings = sugar_1.default('scss');
                const settingsString = jsObjectToScssMap_1.default(settings);
                const path = isInPackage_1.default('coffeekraken', process.cwd(), true)
                    ? path_1.default.resolve(packageRoot_1.default(__dirname, true), 'toolkits/sugar/index')
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
exports.default = getScssSharedResourcesString;
;
