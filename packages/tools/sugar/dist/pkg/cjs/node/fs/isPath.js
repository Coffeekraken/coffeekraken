"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const is_valid_path_1 = __importDefault(require("is-valid-path"));
/**
 * @name                            isPath
 * @namespace            node.fs
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Check if the passed string is a valid path or not
 *
 * @param         {String}            path              The path to check
 * @param         {Boolean}           [checkExistence=false]      Specify if you want to check that the passed path actually exist
 * @return        {Boolean}                             true if the path is valide, false if not
 *
 * @snippet         __isPath($1)
 *
 * @example       js
 * import { __isPath } from '@coffeekraken/sugar/fs';
 * __isPath('hello/world'); // => true
 *
 * @see       https://www.npmjs.com/package/is-valid-path
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isPath(path, checkExistence = false) {
    if (typeof path !== 'string')
        return false;
    // empty string
    if (path.trim() === '')
        return false;
    // multiple lines content
    if (path.split('\n').length > 1)
        return false;
    // check if we have some /
    if (!path.includes('/')) {
        if (!path.includes('.'))
            return false;
    }
    // check if the path is valid or not
    if (!(0, is_valid_path_1.default)(path))
        return false;
    // if we have to check the path existence
    if (checkExistence) {
        if (!fs_1.default.existsSync(path))
            return false;
    }
    // otherwise, all is ok
    return true;
}
exports.default = __isPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRDQUFzQjtBQUN0QixrRUFBMEM7QUFFMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUF3QixRQUFRLENBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRyxLQUFLO0lBQ3pELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRTNDLGVBQWU7SUFDZixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFckMseUJBQXlCO0lBQ3pCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRTlDLDBCQUEwQjtJQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztLQUN6QztJQUVELG9DQUFvQztJQUNwQyxJQUFJLENBQUMsSUFBQSx1QkFBYSxFQUFDLElBQUksQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRXZDLHlDQUF5QztJQUN6QyxJQUFJLGNBQWMsRUFBRTtRQUNoQixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztLQUM1QztJQUVELHVCQUF1QjtJQUN2QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBeEJELDJCQXdCQyJ9