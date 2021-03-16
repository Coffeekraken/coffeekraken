"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                hasExitCleanup
 * @namespace           sugar.node.process
 * @type                Function
 * @status              wip
 *
 * This function return simply if the exit cleanup process using the "node.process.hasExitCleanup" function has been inited
 *
 * @return      {Boolean}             true if the exit cleanup has been registered, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import hasExitCleanup from '@coffeekraken/sugar/node/process/hasExitCleanup';
 * import exitCleanup from '@coffeekraken/sugar/node/process/exitCleanup';
 * hasExitCleanup(); // => false;
 * exitCleanup();
 * hasExitCleanup(); // => true
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function hasExitCleanup() {
    return process.env.EXIT_CLEANUP !== undefined
        ? process.env.EXIT_CLEANUP
        : false;
}
exports.default = hasExitCleanup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzRXhpdENsZWFudXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZS9wcm9jZXNzL2hhc0V4aXRDbGVhbnVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsY0FBYztJQUNyQixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxLQUFLLFNBQVM7UUFDM0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWTtRQUMxQixDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ1osQ0FBQztBQUNELGtCQUFlLGNBQWMsQ0FBQyJ9