"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                                      isNode
 * @namespace           sugar.js.is
 * @type                                      Function
 * @stable
 *
 * Check if the current script is running under node runtime or not...
 *
 * @return                {Boolean}                           true if running under javascript runtime, false if not...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import isNode from '@coffeekraken/sugar/js/is/node';
 * isNode(); // => true
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.default = () => {
    return (typeof process !== 'undefined' &&
        process.release &&
        process.release.name === 'node');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOztBQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILGtCQUFlLEdBQUcsRUFBRTtJQUNsQixPQUFPLENBQ0wsT0FBTyxPQUFPLEtBQUssV0FBVztRQUM5QixPQUFPLENBQUMsT0FBTztRQUNmLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FDaEMsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9