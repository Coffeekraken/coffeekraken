"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mobile_detect_1 = __importDefault(require("mobile-detect"));
/**
 * @name        isPhone
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Detect if is a phone device
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is a phone, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isPhone from '@coffeekraken/sugar/js/is/phone'
 * if (isPhone()) {
 *   // do something cool...
 * }
 *
 * @see       https://www.npmjs.com/package/mobile-detect
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isPhone(ua = navigator.userAgent) {
    const md = new mobile_detect_1.default(ua);
    return md.phone() !== null;
}
module.exports = isPhone;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaG9uZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLGtFQUF5QztBQUN6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxPQUFPLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxTQUFTO0lBQ3ZDLE1BQU0sRUFBRSxHQUFHLElBQUksdUJBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxJQUFJLENBQUM7QUFDN0IsQ0FBQztBQUNELGlCQUFTLE9BQU8sQ0FBQyJ9