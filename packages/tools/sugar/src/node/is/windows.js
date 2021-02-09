"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                            windows
 * @namespace           sugar.js.is
 * @type                            Function
 * @stable
 *
 * Check if the app run on mac OS X or not
 *
 * @return        {Boolean}                             true if mac OS X, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isOsx from '@coffeekraken/sugar/js/is/windows';
 * isWindows(); // => true
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function windows() {
    if (process && process.platform) {
        return process.platform === 'win32';
    }
    return navigator.platform.toUpperCase().indexOf('WIN') > -1;
}
exports.default = windows;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndpbmRvd3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOztBQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILFNBQVMsT0FBTztJQUNkLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7UUFDL0IsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQztLQUNyQztJQUNELE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDOUQsQ0FBQztBQUNELGtCQUFlLE9BQU8sQ0FBQyJ9