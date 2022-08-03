"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMap_1 = __importDefault(require("../../shared/object/deepMap"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const monorepoToPackageAbsolutePath_1 = __importDefault(require("./monorepoToPackageAbsolutePath"));
/**
 * @name            monorepoToPackageAbsolutePathDeepMap
 * @type            Function
 * @static
 *
 * This method allows you to make the passed path absolute to the package root passed.
 * This uses the `monorepoToPackageAbsolutePath` method to make all the paths in the passed object
 * absolute to the package root path.
 *
 * @param      {Object}           obj      The object in which to make all the paths absolute to the current package root path
 * @param       {String}           [packageRootPath=__packageRoot()]  The package root path
 * @return     {Object}}       The absolute path object to the passed package root path
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function monorepoToPackageAbsolutePathDeepMap(obj, packageRootPath = (0, packageRoot_1.default)()) {
    return (0, deepMap_1.default)(obj, ({ object, path, value, prop }) => {
        if (typeof value === 'string') {
            value = (0, monorepoToPackageAbsolutePath_1.default)(value, packageRootPath);
        }
        return value;
    });
}
exports.default = monorepoToPackageAbsolutePathDeepMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMEVBQW9EO0FBQ3BELHNFQUFnRDtBQUNoRCxvR0FBOEU7QUFFOUU7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsU0FBd0Isb0NBQW9DLENBQ3hELEdBQVEsRUFDUixrQkFBMEIsSUFBQSxxQkFBYSxHQUFFO0lBRXpDLE9BQU8sSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNwRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMzQixLQUFLLEdBQUcsSUFBQSx1Q0FBK0IsRUFBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDbkU7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFWRCx1REFVQyJ9