"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
// TODO tests
/**
 * @name                            linux
 * @namespace            shared.is
 * @type                            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the app run on linux
 *
 * @return        {Boolean}                             true if linux, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isLinux from '@coffeekraken/sugar/shared/is/linux';
 * isLinux(); // => true
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function linux() {
    if (process && process.platform) {
        return process.platform === 'linux';
    }
    return navigator.platform.toUpperCase().indexOf('LINUX') >= 0;
}
exports.default = linux;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGFBQWE7QUFFYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsS0FBSztJQUNWLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7UUFDN0IsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQztLQUN2QztJQUNELE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xFLENBQUM7QUFDRCxrQkFBZSxLQUFLLENBQUMifQ==