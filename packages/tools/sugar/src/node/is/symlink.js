// @ts-nocheck
import __fs from 'fs';
/**
 * @name            symlink
 * @namespace            node.is
 * @type            Function
 * @platform        ts
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isSymlink(path) {
    return __fs.existsSync(path) && __fs.lstatSync(path).isSymbolicLink();
}
export default isSymlink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ltbGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN5bWxpbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsU0FBUyxDQUFDLElBQUk7SUFDckIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDeEUsQ0FBQztBQUNELGVBQWUsU0FBUyxDQUFDIn0=