"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isYyyymmddDate
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
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
 * @example    js
 * import isYyyymmddDate from '@coffeekraken/sugar/js/is/yyyymmddDate'
 * if (isYyyymmddDate('2018.12.25')) {
 *     // do something cool
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isYyyymmddDate(date) {
    return /^\d{4}[\-\/\s\.]?((((0[13578])|(1[02]))[\-\/\s\.]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s\.]?(([0-2][0-9])|(30)))|(02[\-\/\s\.]?[0-2][0-9]))$/.test(date);
}
exports.default = isYyyymmddDate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXl5eW1tZGREYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsieXl5eW1tZGREYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7QUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxjQUFjLENBQUMsSUFBSTtJQUMxQixPQUFPLHVKQUF1SixDQUFDLElBQUksQ0FDakssSUFBSSxDQUNMLENBQUM7QUFDSixDQUFDO0FBQ0Qsa0JBQWUsY0FBYyxDQUFDIn0=