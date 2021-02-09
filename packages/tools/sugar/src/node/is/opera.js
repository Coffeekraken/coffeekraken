"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isOpera
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Detect if is opera
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is opera, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isOpera from '@coffeekraken/sugar/js/is/opera'
 * if (isOpera()) {
 *   // do something cool
 * }
 *
 * @since         1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isOpera(ua = navigator.userAgent) {
    return ua.toLowerCase().indexOf('op') > -1;
}
exports.default = isOpera;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcGVyYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLFNBQVM7SUFDdkMsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFDRCxrQkFBZSxPQUFPLENBQUMifQ==