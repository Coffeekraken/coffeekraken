import __packageJsonSync from '../package/packageJsonSync';
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
export default function __isMonorepo() {
    const json = __packageJsonSync();
    return json.workspaces !== undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8saUJBQWlCLE1BQU0sNEJBQTRCLENBQUM7QUFFM0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsWUFBWTtJQUNoQyxNQUFNLElBQUksR0FBRyxpQkFBaUIsRUFBRSxDQUFDO0lBQ2pDLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUM7QUFDekMsQ0FBQyJ9