"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                                      isNode
 * @namespace            shared.is
 * @type                                      Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * import { __isNode } from '@coffeekraken/sugar/is';
 * __isNode(); // => true
 *
 @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isNode() {
    return (typeof process !== 'undefined' &&
        process.release &&
        process.release.name === 'node');
}
exports.default = __isNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBd0IsUUFBUTtJQUM1QixPQUFPLENBQ0gsT0FBTyxPQUFPLEtBQUssV0FBVztRQUM5QixPQUFPLENBQUMsT0FBTztRQUNmLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FDbEMsQ0FBQztBQUNOLENBQUM7QUFORCwyQkFNQyJ9