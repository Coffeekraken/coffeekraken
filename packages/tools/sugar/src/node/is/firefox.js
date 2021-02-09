"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isFirefox
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Detect if is firefox
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is firefox, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isFirefox from '@coffeekraken/sugar/js/is/firefox'
 * if (isFirefox()) {
 *   // do something cool
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isFirefox(ua = navigator.userAgent) {
    return ua.indexOf('Firefox') > -1;
}
exports.default = isFirefox;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWZveC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmVmb3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7O0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxTQUFTLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxTQUFTO0lBQ3pDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=