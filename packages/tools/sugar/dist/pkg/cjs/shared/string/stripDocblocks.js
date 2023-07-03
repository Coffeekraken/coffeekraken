"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            stripDocblocks
 * @namespace       shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function simply take a string and get rid of all docblocks
 *
 * @param       {String}            str         The string to process
 * @return      {String}                        The processed string
 *
 * @snippet         __stripDocblocks($1)
 *
 * @example         js
 * import { __stripDocblocks } from '@coffeekraken/sugar/string';
 * __stripDocblocks('...');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __stripDocblocks(str) {
    return str.replace(/(\/\*{2})([\s\S]+?)(\*\/)/gm, '');
}
exports.default = __stripDocblocks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQXdCLGdCQUFnQixDQUFDLEdBQVc7SUFDaEQsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLDZCQUE2QixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFGRCxtQ0FFQyJ9