"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
// TODO tests
/**
 * @name                            osx
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
 * import isOsx from '@coffeekraken/sugar/js/is/osx';
 * isOsx(); // => true
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function osx() {
    if (process && process.platform) {
        return process.platform === 'darwin';
    }
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
}
exports.default = osx;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3N4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib3N4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7QUFFVixhQUFhO0FBRWI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsU0FBUyxHQUFHO0lBQ1YsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUMvQixPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDO0tBQ3RDO0lBQ0QsT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUQsQ0FBQztBQUNELGtCQUFlLEdBQUcsQ0FBQyJ9