"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const composerPath_1 = __importDefault(require("./composerPath"));
/**
 * @name                composerJsonSync
 * @namespace            node.npm
 * @type                Function
 * @platform        node
 * @status          beta
 *
 * This function simply take a package name as parameter, and return the corresponding
 * composer.json JSON content
 *
 * @param       {String}        [nameOrPath=process.cwd()]        the package name or path wanted
 * @param       {IPackageJson}      [settings={}]       Some settings to configure your process
 * @return      {JSON}                      The package.json content
 *
 * @snippet         __composerJson($1)
 *
 * @example         js
 * import { __composerJson } from '@coffeekraken/sugar/composer`;
 * __composerJson('lodash');
 *
 * @todo        Implement a cache strategy to avoid making same process again and again
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function composerJsonSync(nameOrPath, settings) {
    if (nameOrPath.match(/^\//)) {
        if (!fs_1.default.existsSync(`${nameOrPath}/composer.json`)) {
            throw new Error(`<red>[composerJsonSync]</red> The passed "${nameOrPath}" folder directory does not contain any composer.json file...`);
        }
        return JSON.parse(fs_1.default.readFileSync(`${nameOrPath}/composer.json`).toString());
    }
    // get package path from name
    const path = (0, composerPath_1.default)(nameOrPath, settings);
    if (path) {
        const json = JSON.parse(fs_1.default.readFileSync(`${path}/composer.json`, 'utf8').toString());
        return json;
    }
    return {};
}
exports.default = composerJsonSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXNCO0FBRXRCLGtFQUE0QztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBd0IsZ0JBQWdCLENBQ3BDLFVBQWtCLEVBQ2xCLFFBQXlDO0lBRXpDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN6QixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsZ0JBQWdCLENBQUMsRUFBRTtZQUNqRCxNQUFNLElBQUksS0FBSyxDQUNYLDZDQUE2QyxVQUFVLCtEQUErRCxDQUN6SCxDQUFDO1NBQ0w7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQ2IsWUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLFVBQVUsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FDOUQsQ0FBQztLQUNMO0lBRUQsNkJBQTZCO0lBQzdCLE1BQU0sSUFBSSxHQUFHLElBQUEsc0JBQWMsRUFBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbEQsSUFBSSxJQUFJLEVBQUU7UUFDTixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUNuQixZQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FDaEUsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxPQUFPLEVBQUUsQ0FBQztBQUNkLENBQUM7QUF6QkQsbUNBeUJDIn0=