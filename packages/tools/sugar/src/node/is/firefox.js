"use strict";
// @ts-nocheck
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
module.exports = isFirefox;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWZveC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmVmb3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLFNBQVM7SUFDekMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFDRCxpQkFBUyxTQUFTLENBQUMifQ==