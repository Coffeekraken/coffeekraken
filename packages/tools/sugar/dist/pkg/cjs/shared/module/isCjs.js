"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name          isCjs
 * @namespace            shared.module
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the current module system the code runs on "esm" module system.
 *
 * @return      {Boolean}           true if the current system is esm
 *
 * @example       js
 * import __isCjs from '@coffeekraken/sugar/shared/module/isCjs';
 * __isCjs(); // => true
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isCjs() {
    return typeof module !== 'undefined';
}
exports.default = isCjs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILFNBQXdCLEtBQUs7SUFDekIsT0FBTyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUM7QUFDekMsQ0FBQztBQUZELHdCQUVDIn0=