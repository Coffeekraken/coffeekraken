"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobile_detect_1 = __importDefault(require("mobile-detect"));
/**
 * @name        isTablet
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Detect if is a tablet device
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is a tablet, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isTablet from '@coffeekraken/sugar/js/is/tablet'
 * if (isTablet()) {
 *   // do something cool...
 * }
 *
 * @see       https://www.npmjs.com/package/mobile-detect
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isTablet(ua = navigator.userAgent) {
    const md = new mobile_detect_1.default(ua);
    return md.tablet() !== null;
}
exports.default = isTablet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFibGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtFQUF5QztBQUN6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxRQUFRLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxTQUFTO0lBQ3hDLE1BQU0sRUFBRSxHQUFHLElBQUksdUJBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxJQUFJLENBQUM7QUFDOUIsQ0FBQztBQUNELGtCQUFlLFFBQVEsQ0FBQyJ9