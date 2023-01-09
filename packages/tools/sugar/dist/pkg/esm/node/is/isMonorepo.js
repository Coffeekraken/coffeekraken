import { __packageJsonSync } from '@coffeekraken/sugar/package';
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
 * @example         js
 * import {__isMonorepo } from '@coffeekraken/sugar/is';
 * __isMonorepo(); // => true
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isMonorepo() {
    const json = __packageJsonSync();
    return json.workspaces !== undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRWhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxZQUFZO0lBQ2hDLE1BQU0sSUFBSSxHQUFHLGlCQUFpQixFQUFFLENBQUM7SUFDakMsT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQztBQUN6QyxDQUFDIn0=