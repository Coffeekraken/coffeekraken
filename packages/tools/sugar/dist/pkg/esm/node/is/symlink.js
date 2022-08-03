// @ts-nocheck
import __fs from 'fs';
/**
 * @name            symlink
 * @namespace            node.is
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function check if the passed string path is a sySlink or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a sySlink, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import isSymlink from '@coffeekraken/sugar/node/is/symlink';
 * isSymlink('something/cool');
 *
 * @todo        Tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isSymlink(path) {
    return __fs.existsSync(path) && __fs.lstatSync(path).isSymbolicLink();
}
export default isSymlink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsU0FBUyxDQUFDLElBQUk7SUFDbkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDMUUsQ0FBQztBQUNELGVBQWUsU0FBUyxDQUFDIn0=