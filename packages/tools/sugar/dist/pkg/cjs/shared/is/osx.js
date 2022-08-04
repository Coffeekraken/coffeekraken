"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
// TODO tests
/**
 * @name                            osx
 * @namespace            shared.is
 * @type                            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the app run on mac OS X or not
 *
 * @return        {Boolean}                             true if mac OS X, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isOsx from '@coffeekraken/sugar/shared/is/osx';
 * isOsx(); // => true
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function osx() {
    if (process && process.platform) {
        return process.platform === 'darwin';
    }
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
}
exports.default = osx;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGFBQWE7QUFFYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsR0FBRztJQUNSLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7UUFDN0IsT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQztLQUN4QztJQUNELE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hFLENBQUM7QUFDRCxrQkFBZSxHQUFHLENBQUMifQ==