"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const packagePathSync_js_1 = __importDefault(require("./packagePathSync.js"));
/**
 * @name                packageJsonSync
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
 * @snippet         __packageJsonSync()
 *
 * @example         js
 * import { __packageJsonSync } from '@coffeekraken/sugar/npm`;
 * __packageJsonSync('lodash');
 *
 * @todo        Implement a cache strategy to avoid making same process again and again
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function packageJsonSync(name, settings) {
    const path = (0, packagePathSync_js_1.default)(name, settings);
    if (path) {
        const json = JSON.parse(fs_1.default.readFileSync(`${path}/package.json`, 'utf8').toString());
        return json;
    }
}
exports.default = packageJsonSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXNCO0FBRXRCLDhFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBd0IsZUFBZSxDQUNuQyxJQUFZLEVBQ1osUUFBd0M7SUFFeEMsTUFBTSxJQUFJLEdBQUcsSUFBQSw0QkFBaUIsRUFBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0MsSUFBSSxJQUFJLEVBQUU7UUFDTixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUNuQixZQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQy9ELENBQUM7UUFDRixPQUFPLElBQUksQ0FBQztLQUNmO0FBQ0wsQ0FBQztBQVhELGtDQVdDIn0=