"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                    rem2px
 * @namespace           sugar.js.unit
 * @type                    Function
 * @stable
 *
 * Convert rem value to a px one
 *
 * @param         {Number}          rem           The rem value to convert
 * @return        {Number}                        The pixel value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import rem2px from '@coffeekraken/sugar/js/unit/rem2px';
 * rem2px(2);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function rem2px(rem) {
    return (rem *
        parseFloat(getComputedStyle(document.documentElement).fontSize || '16px'));
}
exports.default = rem2px;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtMnB4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVtMnB4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7QUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxNQUFNLENBQUMsR0FBRztJQUNqQixPQUFPLENBQ0wsR0FBRztRQUNILFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxDQUMxRSxDQUFDO0FBQ0osQ0FBQztBQUNELGtCQUFlLE1BQU0sQ0FBQyJ9