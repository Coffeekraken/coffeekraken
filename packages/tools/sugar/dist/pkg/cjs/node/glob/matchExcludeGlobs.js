"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimatch_1 = __importDefault(require("minimatch"));
/**
 * @name                    matchExcludeGlobs
 * @namespace            node.glob
 * @type                    Function
 * @platform        node
 * @status          beta
 *
 * This function check if the passed path match one or more exclude globs specified in the config "storage.exclude"
 *
 * @param           {String}            path            The path to check
 * @return          {Boolean}                           true if the path match at least 1 exclude glob, false if not
 *
 * @example         js
 * import { __matchExcludeGlobs } from '@coffeekraken/sugar/glob';
 * if (__matchExcludeGlobs('something/cool.js')) {
 *      // ...
 * }
 *
 * @see             https://www.npmjs.com/package/minimatch
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __matchExcludeGlobs(path) {
    const excludeGlobs = __excludedGlobs();
    for (let i = 0; i < excludeGlobs.length; i++) {
        if ((0, minimatch_1.default)(excludeGlobs[i], path))
            return true;
    }
    return false;
}
exports.default = __matchExcludeGlobs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBEQUFvQztBQUdwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBd0IsbUJBQW1CLENBQUMsSUFBWTtJQUNwRCxNQUFNLFlBQVksR0FBRyxlQUFlLEVBQUUsQ0FBQztJQUN2QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMxQyxJQUFJLElBQUEsbUJBQVcsRUFBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7S0FDdkQ7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBTkQsc0NBTUMifQ==