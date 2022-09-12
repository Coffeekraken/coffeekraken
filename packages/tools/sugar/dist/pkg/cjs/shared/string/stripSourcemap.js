"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            stripSourcemap
 * @namespace       shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function simply take a string and get rid of all sourcemap
 *
 * @feature        Support sourcemap like `//# sourceMappingURL=...`
 *
 * @param       {String}            str         The string to process
 * @return      {String}                        The processed string
 *
 * @example         js
 * import { __stripSourcemap } from '@coffeekraken/sugar/string';
 * __stripSourcemap('...');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __stripSourcemap(str) {
    str = str.replace(/\/\/#\s?sourceMappingURL=[\w\W]+/gm, '');
    return str;
}
exports.default = __stripSourcemap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQXdCLGdCQUFnQixDQUFDLEdBQVc7SUFDaEQsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsb0NBQW9DLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUQsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBSEQsbUNBR0MifQ==