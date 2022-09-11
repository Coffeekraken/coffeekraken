"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const packagePath_1 = __importDefault(require("./packagePath"));
/**
 * @name                packageJson
 * @namespace            node.npm
 * @type                Function
 * @platform        node
 * @status          beta
 *
 * This function simply take a package name as parameter, and return the corresponding
 * package.json JSON content
 *
 * @param       {String}        name        the package name wanted
 * @param       {IPackageJson}      [settings={}]       Some settings to configure your process
 * @return      {JSON}                      The package.json content
 *
 * @example         js
 * import packageJson from '@coffeekraken/sugar/node/npm/packageJson`;
 * packagrJson('lodash');
 *
 * @todo        Implement a cache strategy to avoid making same process again and again
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function packageJson(name, settings) {
    const path = (0, packagePath_1.default)(name, settings);
    if (path) {
        const json = JSON.parse(fs_1.default.readFileSync(`${path}/package.json`, 'utf8').toString());
        return json;
    }
}
exports.default = packageJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXNCO0FBRXRCLGdFQUEwQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQXdCLFdBQVcsQ0FDL0IsSUFBWSxFQUNaLFFBQXdDO0lBRXhDLE1BQU0sSUFBSSxHQUFHLElBQUEscUJBQWEsRUFBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0MsSUFBSSxJQUFJLEVBQUU7UUFDTixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUNuQixZQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQy9ELENBQUM7UUFDRixPQUFPLElBQUksQ0FBQztLQUNmO0FBQ0wsQ0FBQztBQVhELDhCQVdDIn0=