
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
export default function __isMonorepo(): boolean {
    const json = __packageJsonSync();
    return json.workspaces !== undefined;
}
