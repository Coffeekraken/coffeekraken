"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_valid_path_1 = __importDefault(require("is-valid-path"));
/**
 * @name                            isPath
 * @namespace           shared.is
 * @type                            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed string is a valid path or not
 *
 * @param         {String}            path              The path to check
 * @return        {Boolean}                             true if the path is valide, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isPath($1)
 *
 * @example       js
 * import { __isPath } from '@coffeekraken/sugar/is';
 * __isPath('hello/world'); // => true
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isPath(path) {
    // check if the path is valid or not
    if (!(0, is_valid_path_1.default)(path))
        return false;
    // otherwise, all is ok
    return true;
}
exports.default = __isPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtFQUEwQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQXdCLFFBQVEsQ0FBQyxJQUFJO0lBQ2pDLG9DQUFvQztJQUNwQyxJQUFJLENBQUMsSUFBQSx1QkFBYSxFQUFDLElBQUksQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ3ZDLHVCQUF1QjtJQUN2QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBTEQsMkJBS0MifQ==