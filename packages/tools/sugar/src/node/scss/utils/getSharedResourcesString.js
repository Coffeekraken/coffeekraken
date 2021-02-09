"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../../config/sugar"));
const isInPackage_1 = __importDefault(require("../../path/isInPackage"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const path_1 = __importDefault(require("path"));
const jsObjectToScssMap_1 = __importDefault(require("./jsObjectToScssMap"));
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
exports.default = getScssSharedResourcesString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U2hhcmVkUmVzb3VyY2VzU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0U2hhcmVkUmVzb3VyY2VzU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtEQUErQztBQUMvQyx5RUFBbUQ7QUFDbkQseUVBQW1EO0FBQ25ELGdEQUEwQjtBQUMxQiw0RUFBc0Q7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsU0FBUyw0QkFBNEIsQ0FBQyxRQUFrQixFQUFFO0lBQ3hELElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtRQUFFLEtBQUssR0FBRyxlQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUUzRSxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFFeEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1FBQzNCLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO1lBQ2xDLElBQUksVUFBVSxLQUFLLE9BQU8sRUFBRTtnQkFDMUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsZUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzFELE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQztnQkFDeEIsTUFBTSxjQUFjLEdBQUcsMkJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3JELE1BQU0sSUFBSSxHQUFHLHFCQUFhLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUM7b0JBQzdELENBQUMsQ0FBQyxjQUFNLENBQUMsT0FBTyxDQUNaLHFCQUFhLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUM5Qiw0QkFBNEIsQ0FDN0I7b0JBQ0gsQ0FBQyxDQUFDLDJCQUEyQixDQUFDO2dCQUNoQyxjQUFjLElBQUk7a0JBQ1IsSUFBSTtnQ0FDVSxjQUFjOztTQUVyQyxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsY0FBYyxJQUFJO1lBQ2QsVUFBVTtTQUNiLENBQUM7YUFDSDtTQUNGO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLGNBQWMsQ0FBQztBQUN4QixDQUFDO0FBQ0Qsa0JBQWUsNEJBQTRCLENBQUMifQ==