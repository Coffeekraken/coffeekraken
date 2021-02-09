"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
// TODO tests
/**
 * @name                            linux
 * @namespace           sugar.js.is
 * @type                            Function
 * @stable
 *
 * Check if the app run on linux
 *
 * @return        {Boolean}                             true if linux, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isLinux from '@coffeekraken/sugar/js/is/linux';
 * isLinux(); // => true
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function linux() {
    if (process && process.platform) {
        return process.platform === 'linux';
    }
    return navigator.platform.toUpperCase().indexOf('LINUX') >= 0;
}
exports.default = linux;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGludXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaW51eC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7O0FBRVYsYUFBYTtBQUViOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILFNBQVMsS0FBSztJQUNaLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7UUFDL0IsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQztLQUNyQztJQUNELE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hFLENBQUM7QUFDRCxrQkFBZSxLQUFLLENBQUMifQ==