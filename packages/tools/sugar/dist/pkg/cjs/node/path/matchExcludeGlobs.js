"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimatch_1 = __importDefault(require("minimatch"));
const excludeGlobs_1 = __importDefault(require("./excludeGlobs"));
/**
 * @name                    matchExcludeGlobs
 * @namespace            node.path
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
 * import matchExcludeGlobs from '@coffeekraken/sugar/node/path/matchExcludeGlobs';
 * if (matchExcludeGlobs('something/cool.js')) {
 *      // ...
 * }
 *
 * @see             https://www.npmjs.com/package/minimatch
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function matchExcludeGlobs(path) {
    const excludeGlobs = (0, excludeGlobs_1.default)();
    for (let i = 0; i < excludeGlobs.length; i++) {
        if ((0, minimatch_1.default)(excludeGlobs[i], path))
            return true;
    }
    return false;
}
exports.default = matchExcludeGlobs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBEQUFvQztBQUNwQyxrRUFBNEM7QUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQXdCLGlCQUFpQixDQUFDLElBQVk7SUFDbEQsTUFBTSxZQUFZLEdBQUcsSUFBQSxzQkFBYyxHQUFFLENBQUM7SUFDdEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDMUMsSUFBSSxJQUFBLG1CQUFXLEVBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO0tBQ3ZEO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQU5ELG9DQU1DIn0=