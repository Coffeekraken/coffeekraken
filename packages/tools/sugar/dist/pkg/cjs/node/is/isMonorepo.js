"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_1 = require("@coffeekraken/sugar/package");
/**
 * @name            isMonorepo
 * @namespace       node.is
 * @type            Function
 * @async
 * @platform        node
 * @status          beta
 *
 * This function allows you to check if the current package this code is running in is a monorepo.
 * Basically it checks in the package.json if the "workspaces" property is set or not
 *
 * @todo        tests           high
 * @todo        Documentation
 *
 * @return          {Boolean}           true if is in a monorepo, false if not
 *
 * @snippet         __isMonorepo()
 *
 * @example         js
 * import {__isMonorepo } from '@coffeekraken/sugar/is';
 * __isMonorepo(); // => true
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isMonorepo() {
    const json = (0, package_1.__packageJsonSync)();
    return json.workspaces !== undefined;
}
exports.default = __isMonorepo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseURBQWdFO0FBRWhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUF3QixZQUFZO0lBQ2hDLE1BQU0sSUFBSSxHQUFHLElBQUEsMkJBQWlCLEdBQUUsQ0FBQztJQUNqQyxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDO0FBQ3pDLENBQUM7QUFIRCwrQkFHQyJ9