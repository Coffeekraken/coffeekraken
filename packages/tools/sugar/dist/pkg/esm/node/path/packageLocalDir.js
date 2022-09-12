// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            packageLocalDir
 * @namespace            node.fs
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the .local directory path
 *
 * @return                {String}                      The path to the .local package directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import { __packageLocalDir } from '@coffeekraken/sugar/path';
 * __packageLocalDir(); // => '/my/cool/path/.local'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __packageLocalDir() {
    return __SSugarConfig.get('storage.package.localDir');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxpQkFBaUI7SUFDckMsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDMUQsQ0FBQyJ9