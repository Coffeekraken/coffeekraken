"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobile_detect_1 = require("mobile-detect");
/**
 * @name        isPhone
 * @namespace           sugar.js.is
 * @type      Function
 *
 * Detect if is a phone device
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @return    {Boolean}    true if is a phone, false if not
 *
 * @example 	js
 * import isPhone from '@coffeekraken/sugar/js/is/phone'
 * if (isPhone()) {
 *   // do something cool...
 * }
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isPhone(ua = navigator.userAgent) {
    const md = new mobile_detect_1.default(ua);
    return md.phone() !== null;
}
exports.default = isPhone;
