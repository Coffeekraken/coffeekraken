"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobile_detect_1 = __importDefault(require("mobile-detect"));
/**
 * @name        isMobile
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect if is a mobile device (phone or tablet)
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test *
 * @return    {Boolean}    true if is a mobile, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import { __isMobile } from 'coffeekraken/sugar/is'
 * if (__isMobile()) {
 *   // do something cool...
 * }
 *
 * @see       https://www.npmjs.com/package/mobile-detect
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isMobile(ua = navigator.userAgent) {
    const md = new mobile_detect_1.default(ua);
    return md.mobile() !== null;
}
exports.default = __isMobile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtFQUF5QztBQUN6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQXdCLFVBQVUsQ0FBQyxLQUFhLFNBQVMsQ0FBQyxTQUFTO0lBQy9ELE1BQU0sRUFBRSxHQUFHLElBQUksdUJBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxJQUFJLENBQUM7QUFDaEMsQ0FBQztBQUhELDZCQUdDIn0=