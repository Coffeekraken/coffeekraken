// @ts-nocheck
import __fs from 'fs-extra';
/**
 * @name        emptyDirSync
 * @namespace            node.fs
 * @type          Function
 * @platform        node
 * @status          beta
 *
 * Empty a directory (sync)
 *
 * @param       {String}              dir           The directory path to empty
 *
 * @snippet         __emptyDirSync($1)
 *
 * @example       js
 * import { __emptyDirSync } from '@coffeekraken/sugar/fs';
 * __emptyDirSync('my/cool/directory');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __emptyDirSync(dir) {
    __fs.emptyDirSync(dir);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjLENBQUMsR0FBRztJQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLENBQUMifQ==