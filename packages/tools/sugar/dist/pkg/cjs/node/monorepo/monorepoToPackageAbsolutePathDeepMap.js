"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const monorepo_1 = require("@coffeekraken/sugar/monorepo");
const path_1 = require("@coffeekraken/sugar/path");
const deepMap_1 = __importDefault(require("../../shared/object/deepMap"));
/**
 * @name            monorepoToPackageAbsolutePathDeepMap
 * @type            Function
 * @private
 *
 * This method allows you to make the passed path absolute to the package root passed.
 * This uses the `monorepoToPackageAbsolutePath` method to make all the paths in the passed object
 * absolute to the package root path.
 *
 * @param      {Object}           obj      The object in which to make all the paths absolute to the current package root path
 * @param       {String}           [packageRootPath=__packageRootDir()]  The package root path
 * @return     {Object}}       The absolute path object to the passed package root path
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __monorepoToPackageAbsolutePathDeepMap(obj, packageRootPath = (0, path_1.__packageRootDir)()) {
    return (0, deepMap_1.default)(obj, ({ object, path, value, prop }) => {
        if (typeof value === 'string') {
            value = (0, monorepo_1.__monorepoToPackageAbsolutePath)(value, packageRootPath);
        }
        return value;
    });
}
exports.default = __monorepoToPackageAbsolutePathDeepMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkRBQStFO0FBQy9FLG1EQUE0RDtBQUM1RCwwRUFBb0Q7QUFFcEQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsU0FBd0Isc0NBQXNDLENBQzFELEdBQVEsRUFDUixrQkFBMEIsSUFBQSx1QkFBZ0IsR0FBRTtJQUU1QyxPQUFPLElBQUEsaUJBQVMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDcEQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDM0IsS0FBSyxHQUFHLElBQUEsMENBQStCLEVBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1NBQ25FO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBVkQseURBVUMifQ==