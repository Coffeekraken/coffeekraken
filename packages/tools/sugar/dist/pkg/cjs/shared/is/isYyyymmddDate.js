"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isYyyymmddDate
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if is a valid yyyy.mm.dd date
 * This will match : yyyy.mm.dd | yyyy/mm/dd | yyyy-mm-dd | yyyy mm dd
 *
 * @param    {String}    date    The date to check
 * @return    {Boolean}    true if is valid, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isYyyymmddDate($1)
 *
 * @example    js
 * import { __isYyyymmddDate } from '@coffeekraken/sugar/is'
 * if (__isYyyymmddDate('2018.12.25')) {
 *     // do something cool
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isYyyymmddDate(date) {
    return /^\d{4}[\-\/\s\.]?((((0[13578])|(1[02]))[\-\/\s\.]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s\.]?(([0-2][0-9])|(30)))|(02[\-\/\s\.]?[0-2][0-9]))$/.test(date);
}
exports.default = __isYyyymmddDate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsU0FBd0IsZ0JBQWdCLENBQUMsSUFBSTtJQUN6QyxPQUFPLHVKQUF1SixDQUFDLElBQUksQ0FDL0osSUFBSSxDQUNQLENBQUM7QUFDTixDQUFDO0FBSkQsbUNBSUMifQ==