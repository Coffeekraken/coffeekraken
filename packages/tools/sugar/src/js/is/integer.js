"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isInteger
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Check if the passed value is an integer
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isInteger from '@coffeekraken/sugar/js/is/integer';
 * isInteger(10) => true
 * isInteger('hello') => false
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isInteger(data) {
    return (!isNaN(data) &&
        (function (x) {
            return (x | 0) === x;
        })(parseFloat(data)));
}
exports.default = isInteger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOztBQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxTQUFTLENBQUMsSUFBSTtJQUNyQixPQUFPLENBQ0wsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ1osQ0FBQyxVQUFVLENBQUM7WUFDVixPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDckIsQ0FBQztBQUNKLENBQUM7QUFDRCxrQkFBZSxTQUFTLENBQUMifQ==